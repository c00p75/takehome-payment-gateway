// NODE JS WEB SERVER
// Import built-in http built in method
import express from 'express';
import dotenv from 'dotenv';

// Configure and retrieve environment variables
dotenv.config();

// Declare port variable
const port = 3001

const baseUrl = '/api/v1/payment';

// Create an expressJs instance
const app = express();

// Make url data more readable
app.use(express.json());

// Listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})


// Handle post request from front end
app.post(baseUrl, (req, res) => {
  console.log(req)
})
