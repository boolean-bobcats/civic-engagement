const request = require('request');
const param = require('jquery-param');

const bingNewsApiKey = process.env.BINGNEWS_APIKEY;

const articleSearchURL = 'https://api.cognitive.microsoft.com/bing/v5.0/news/search';

const bingNews = {
  getArticles: (req, res) => {
    const options = {
      q: req.params.name,
      count: 20,
      mkt: 'en-us',
      safeSearch: 'Moderate'
    };
    const config = {
      url: `${articleSearchURL}?${param(options)}`,
      headers: {
        'Ocp-Apim-Subscription-Key': bingNewsApiKey
      }
    };
    request.get(config, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).send(body);
      }
    });
  }
};

module.exports = bingNews;
