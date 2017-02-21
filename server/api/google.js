const request = require('request');

const civApiKey = process.env.GOOGLE_CIV_APIKEY;
const mapsApiKey = process.env.GOOGLE_MAPS_APIKEY;
const repApiURL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const voterApiURL = 'https://www.googleapis.com/civicinfo/v2/voterinfo';

// geocoding API key
const googleMapsClient = require('@google/maps').createClient({
  key: mapsApiKey
});

const Google = {
  // Google API too representativeInfoQuery endpoint
  getReps: (req, res) => {
    const address = req.params.address;
    console.log(`${repApiURL}?key=${civApiKey}&${address}`);
    request(
      {
        method: 'GET',
        uri: `${repApiURL}?key=${civApiKey}&address=${address}`,
        gzip: true
      },
      (error, response, body) => {
        if (error) {
          console.error(error);
        } else {
          res.status(200).send(body);
        }
      });
  },
  // Google API too voterInfoQuery endpoint for election related data
  getVoterInfo: (req, res) => {
    const address = req.params.address;
    console.log(`${voterApiURL}?key=${civApiKey}&${address}`);
    request(
      {
        method: 'GET',
        uri: `${voterApiURL}?key=${civApiKey}&address=${address}`,
        gzip: true
      },
      (error, response, body) => {
        let resBody = JSON.parse(body);
        if (error) {
          console.error(error);
        } else if (response.statusCode === 400 && resBody.error.message === 'Election unknown') {
          res.status(200).send('No Election Data');
        } else {
          res.status(200).send(body);
        }
      }
    );
  },

  // Geocode an address or zipcode
  geocode: (req, res) => {
    googleMapsClient.geocode({
      address: req.params.location
    }, function(err, response, body) {
      if (err) {
        console.error(error);
      } else {
        const resBody = response.json.results;
        // console.log(resBody);
        res.status(200).send(resBody);  
      }
    });
  }
};

module.exports = Google;
