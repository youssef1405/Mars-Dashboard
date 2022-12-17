require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

/**
 * calls the Nasa APi and returns the data to the frontend
 */
app.post('/rover', async (req, res) => {
  const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.body.roverName}/photos?sol=1000&api_key=${process.env.API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const roverData = await response.json();
    res.send(roverData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
