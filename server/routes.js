const express = require('express');
const Google = require('./api/google');
const nytimes = require('./api/nytimes');
const bingNews = require('./api/bingNews');
// const wsj = require('./api/wsj');
// const reuters = require('./api/reuters');
// const apnews = require('./api/apnews');

// const meetup = require('./api/meetup');

const router = express.Router();

router.get('/representatives/:address', Google.getReps);
router.get('/voting/:address', Google.getVoterInfo);

router.get('/nytimes/:name', nytimes.getArticles);
router.get('/bingNews/:name', bingNews.getArticles);
// router.get('/wsj/:name', wsj.getArticles); // only allows top headlines
// router.get('/reuters/:name', reuters.getArticles); // crap api
// router.get('/apnews/:name', apnews.getArticles); // fake news

router.get('/geocode/:location', Google.geocode);
// router.get('/meetup/:location', meetup.getEvents);



router.get('/test', (req, res) => {
  console.log('got it');
  res.send({ data: 'data!' });
});


module.exports = router;
