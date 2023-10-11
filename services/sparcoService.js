import dotenv from 'dotenv';
import process from 'process';
import fetch from 'node-fetch';
import jwt_encode from "jwt-encode";
import addUserToDataBase from './storage.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const SPARCO_PUB_KEY =  process.env.SPARCO_PUB_KEY;
const SPARCO_SEC_KEY =  process.env.SPARCO_SEC_KEY;


if (!SPARCO_PUB_KEY) { console.log('Sparco Public Key missing') }
if (!SPARCO_SEC_KEY) { console.log('Sparco Secrete Key missing') }

// Check sparco payment status
const sparcoPaymentStatus = (requestRef, encoded_payload) => {
  // Return a promise
  return new Promise((resolve) => {
    // Return failed status if payment is still pending after 2 minutes
    const timer = setTimeout(() => {
      console.log("Sparco payment request timed out")
      clearInterval(interval);
      resolve('FAILED');
    }, 120000);

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

const sparcoPayment =async (data, res) => {
  
    // Create SparcoPay payload
    const payload = {
      amount: parseFloat(data.localAmount),
      currency: data.currency,
      customerEmail: data.email,
      customerFirstName: data.firstName,
      customerLastName: data.lastName,
      customerPhone: "0"+ data.wallet,
      merchantPublicKey: SPARCO_PUB_KEY,
      transactionName: data.reference,
      transactionReference: uuidv4(),       // Generate random reference
      wallet: "0" + data.wallet,     
      chargeMe: true,
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
      console.log(response);
      const sparcoSatus = await sparcoPaymentStatus(response.reference, encoded_payload);   // Passing reference to check payment status
      if (sparcoSatus == "SUCCESS") {
        addUserToDataBase(payload);                    // Add user to database                                      // Include name and amout to database
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
}

export { SPARCO_PUB_KEY, SPARCO_SEC_KEY, sparcoPayment };