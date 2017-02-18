const request = require('request');
const param = require('jquery-param');

const nytimesApiKey = process.env.NYTIMES_APIKEY;

const articleSearchURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const nytimes = {
  getArticles: (req, res) => {
    const options = {
      'api-key': nytimesApiKey,
      q: req.params.name,
      fq: 'news_desk:("politics")',
      sort: 'newest'
    };
    // console.log(options);
    // console.log(`in nytimes article search api route with options: ${options}`);
    request.get(`${articleSearchURL}?${param(options)}`, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).send(body);
      }
    });
  }
};

module.exports = nytimes;
