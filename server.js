// NODE JS WEB SERVER
// Import built-in http built in method
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import fetchCurrencyData from './services/currencyService.js';
import { SPARCO_PUB_KEY, SPARCO_SEC_KEY, sparcoPayment } from './services/sparcoService.js';
import addUserToDataBase from './services/storage.js';


// Create an expressJs instance
const app = express();

// Use the cors middleware 
app.use(cors({
  origin: '*',                                       // Specify the allowed origin for your frontend
  methods: '*',                                      // allowed HTTP methods
  allowedHeaders: '*',                               // allowed headers
}));

// Configure and retrieve environment variables
dotenv.config();
const payPalId = process.env.PAYPAL_CLIENT_ID;

if (!payPalId) { console.log('Paypal client ID missing') }

// Declare port and url variable
const port = process.env.PORT || 3001
const baseUrl = '/api/v1/payment';

// Make url data more readable
app.use(express.json());

// Serve static files from the 'dist' directory generated by Vite.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// Listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

// All routes will be handled by serving the 'index.html' file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Currency conversion
app.post(`${baseUrl}/currency-conversion`, async (req, res) => {
  const country = req.body.country;
  const countryCurrencyConversion = await fetchCurrencyData(country);
  if (countryCurrencyConversion){
    res.status(200).json(countryCurrencyConversion);                      // Send a successful response.
  } else {
    res.status(500).send('Internal Server Error(Data fetch error)');
  }
})

// Retrive paypal client id
app.get(`${baseUrl}/paypal-id`, (req, res) => {
  res.json({ payPalId });
});


// Handle post request from front end
app.post(baseUrl, async (req, res) => {
  if (!SPARCO_PUB_KEY || !SPARCO_SEC_KEY || !payPalId) {
    res.status(500).send('Internal Server Error(missing server side credentials)');
  }

  const data = req.body;                      // Destructuring data from the front-end

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

    // Make sparco payment
    sparcoPayment(payload, res);

  } else if (data.paymentmode === 'visa'){                            // Handle paypal payment status
    if(data.payPalStatus == true){
      addUserToDataBase(data)                                             // Include name and amout to database
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
})
