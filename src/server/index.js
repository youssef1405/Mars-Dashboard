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

// API calls
app.post('/rover', async (req, res) => {
  console.log(req.body);
  const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.body.roverName}/photos?sol=1000&api_key=${process.env.API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const roverData = await response.json();
    const { rover, img_src, earth_date } = roverData['photos'][0];
    const { name, landing_date, launch_date, status } = rover;
    res.send({ name, img_src, landing_date, launch_date, status, earth_date });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
