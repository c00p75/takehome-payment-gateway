// NODE JS WEB SERVER
// Import built-in http built in method
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';
import process from 'process';
import { v4 as uuidv4 } from 'uuid';
import jwt_encode from "jwt-encode";
import fetch from 'node-fetch';

// Configure and retrieve environment variables
dotenv.config();
const SPARCO_PUB_KEY =  process.env.SPARCO_PUB_KEY;
const SPARCO_SEC_KEY =  process.env.SPARCO_SEC_KEY;
const payPalId = process.env.PAYPAL_CLIENT_ID;

if (!SPARCO_PUB_KEY) { console.log('Sparco Public Key missing') }
if (!SPARCO_SEC_KEY) { console.log('Sparco Secrete Key missing') }
if (!payPalId) { console.log('Paypal client ID missing') }

// Declare port variable
const port = process.env.PORT || 3001

const baseUrl = '/api/v1/payment';

// Create an expressJs instance
const app = express();

// Use the cors middleware 
app.use(cors({
  origin: 'http://localhost:3000',                   // Specify the allowed origin for your frontend
  methods: '*',                                      // allowed HTTP methods
  allowedHeaders: '*',                               // allowed headers
}));

// Make url data more readable
app.use(express.json());

// Listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

// Retrive paypal client id
app.get(`${baseUrl}/paypal-id`, (req, res) => {
  res.json({ payPalId });
});

// Check sparco payment status
const sparcoPaymentStatus = (requestRef, encoded_payload) => {
  // Return a promise
  return new Promise((resolve) => {
    // Return failed status if payment is still pending after 3 minutes
    const timer = setTimeout(() => {
      console.log("Sparco payment request timed out")
      clearInterval(interval);
      resolve('FAILED');
    }, 180000);

    // Set interval to repeatedly check payment status every 5 seconds
    const interval = setInterval(async () => {
      try {
        const paymentStatus = await fetch(`https://live.sparco.io/gateway/api/v1/transaction/query?reference=${requestRef}`, {
          headers: { 'token': encoded_payload },
        });
        if (paymentStatus.ok) {
          const response = await paymentStatus.json();
          console.log(response.status)
          switch (response.status) {
            case "TXN_AUTH_UNSUCCESSFUL":
              console.log(resolve(response.status))
              clearInterval(interval);
              clearTimeout(timer);
              resolve(response.status);         // Resolve the promise with the final status
              break;
            case "TXN_FAILED":
              console.log(resolve(response.status))
              clearInterval(interval);
              clearTimeout(timer);
              resolve(response.status);         // Resolve the promise with the final status
              break;
            case "TXN_SUCCESSFUL":
              clearInterval(interval);
              clearTimeout(timer);
              resolve("SUCCESS");               // Resolve the promise with the final status
              break;
            default:
              break;
          }
        } else {
          // Handle non-successful response
          resolve(paymentStatus.status);       // Resolve the promise with the final status
          clearInterval(interval);
          clearTimeout(timer);
        }
      } catch(error) {
        console.log('error posting to sparco', error);
        clearInterval(interval);
        clearTimeout(timer);
        resolve("FAILED");                    // Resolve the promise with the final status
      }
    }, 5000);
  });
};

// Handle post request from front end
app.post(baseUrl, async (req, res) => {
  if (!SPARCO_PUB_KEY || !SPARCO_SEC_KEY || !payPalId) {
    res.status(500).send('Internal Server Error(missing server side credentials)');
  }

  const data = req.body;                      // Decoding encrypted data from the front-end
  
  // Create simple database
  const addUserToDataBase = () => {
    if (!fs.existsSync('./database')){        // Check if /database does not exit
      fs.mkdir('./database', (err) => {       // Create directory
        if(err){ console.log(err) }           // Check if there is an error
      })
    }
    fs.writeFile('./database/donors.txt', `\nNAME: ${data.first} ${data.lastName} EMAIL: ${data.email} AMOUNT: $${data.usdAmount}\n`, { flag: 'a' }, (err) => {
      if (err) { console.error('Error appending data to the file:', err);
      } else { console.log('Record Saved')}
    });
  }

  // Handle Mobile Money payement request
  if (data.paymentmode !== 'visa' && SPARCO_PUB_KEY && SPARCO_SEC_KEY) {
    console.log("Payment Method: Mobile Money")
    // Create SparcoPay payload
    const payload = {
      customerEmail: data.email,
      customerFirstName: data.firstName,
      customerLastName: data.lastName,
      customerPhone: "0"+ data.wallet,
      wallet: "0" + data.wallet,
      amount: data.localAmount,
      currency: data.currency,
      merchantPublicKey: SPARCO_PUB_KEY,
      transactionName: data.reference,
      transactionReference: uuidv4(),       // Generate random reference
      chargeMe: false,
    };

    // Encode SparcoPay data using Sparco secrete key.
    const encoded_payload = jwt_encode(payload, SPARCO_SEC_KEY);

    const baseUrl = "https://live.sparco.io/gateway/api/v1/momo/debit";

    // Post data to Sparco API
    try {
      const sparcoPaymentRequest = await fetch(baseUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"payload": encoded_payload}),
      });

      if (sparcoPaymentRequest.ok) {
        console.log('Request successfully sent to Sparco API')
        const response = await sparcoPaymentRequest.json();                                   // Parse the response data as JSON
        const sparcoSatus = await sparcoPaymentStatus(response.reference, encoded_payload);   // Passing reference to check payment status
        if (sparcoSatus == "SUCCESS") {
          addUserToDataBase()                                      // Include name and amout to database
          res.status(200).send('successful');                      // Send a successful response.
        } else {
          console.log("Sparco fail: ", sparcoSatus)
          res.status(500).send(sparcoSatus);                       // Send a unsuccessful response.
        }
      } else {
        // Handle non-successful response
        throw new Error(`HTTP error! Status: ${sparcoPaymentRequest.status}`);
      }
    } catch(error) {
      console.log('error posting to sparco', error);
      res.status(500).send('Internal Server Error');                  // Return error status to frontend
    }
  } else if (data.paymentmode === 'visa'){                            // Handle paypal payment status
    if(data.payPalStatus == true){
      addUserToDataBase()                                             // Include name and amout to database
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
})