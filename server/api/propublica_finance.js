const rp = require('request-promise');

const propubFinApiKey = process.env.PROPUBLICA_CAMPAIGN_FIN_APIKEY;
const headers = { 'X-API-Key': propubFinApiKey };

const BASE_URL = 'https://api.propublica.org/campaign-finance/v1';

const propublica = {

  top20List: (req, res) => {
    console.log('Top 20 List Lookup');
    const cycle = req.params.cycle;
    const category = req.params.category;
    const url = `${BASE_URL}/${cycle}/candidates/leaders/${category}.json`;
    const config = { url, headers };

    rp.get(config)
    .then((data) => {
      // PARSE THE DATA AS NECESSARY
      // const parsed = { articles, query, api: 'bing' };
      // res.status(200).send(parsed);
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
  }
/*
  memberBio: (req, res) => {
    console.log('test');
    const id = req.params.id;
    console.log(id);
    const url = `${BASE_URL}/members/${id}.json`;
    // const url = 'https://api.propublica.org/congress/v1/members/K000388.json';
    const config = { url, headers };

    rp.get(config)
    .then((data) => {
      // PARSE THE DATA AS NECESSARY
      // const parsed = { articles, query, api: 'bing' };
      // res.status(200).send(parsed);
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
  },

  memberVotes: (req, res) => {
    console.log('test');
    const id = req.params.id;
    console.log(id);
    const url = `${BASE_URL}/members/${id}/votes.json`;
    const config = { url, headers };

    rp.get(config)
    .then((data) => {
      // PARSE THE DATA AS NECESSARY
      // const parsed = { articles, query, api: 'bing' };
      // res.status(200).send(parsed);
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
  },

  memberBills: (req, res) => {
    console.log('test');
    const id = req.params.id;
    console.log(id);
    const url = `${BASE_URL}/members/${id}/bills/cosponsored.json`;
    const config = { url, headers };

    rp.get(config)
    .then((data) => {
      // PARSE THE DATA AS NECESSARY
      // const parsed = { articles, query, api: 'bing' };
      // res.status(200).send(parsed);
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
  }
*/
};

module.exports = propublica;
