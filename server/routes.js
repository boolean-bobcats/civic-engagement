const express = require('express');
const Google = require('./api/google');
const nytimes = require('./api/nytimes');
const bingNews = require('./api/bingNews');
const propublica = require('./api/propublica');
const pubFinance = require('./api/propublica_finance');

// const wsj = require('./api/wsj');
// const reuters = require('./api/reuters');
// const apnews = require('./api/apnews');

const meetup = require('./api/meetup');
const eventbrite = require('./api/eventbrite');

const router = express.Router();
const userController = require('./UserController');

router.get('/representatives/:address', Google.getReps);
router.get('/voting/:address', Google.getVoterInfo);

router.get('/nytimes/:name', nytimes.getArticles);
router.get('/bingNews/:name', bingNews.getArticles);
// router.get('/wsj/:name', wsj.getArticles); // only allows top headlines
// router.get('/reuters/:name', reuters.getArticles); // crap api
// router.get('/apnews/:name', apnews.getArticles); // fake news
// router.get('/geocode/:location', Google.geocode);
router.get('/meetup/:location', meetup.getEvents);
router.get('/eventbrite/:location', eventbrite.getEvents);

router.get('/propublica/chamber/:chamber', propublica.memberList);
router.get('/propublica/member/:name', propublica.memberBio);
router.get('/propublica/member/votes/:name', propublica.memberVotes);
router.get('/propublica/member/bills/:name', propublica.memberBills);
router.get('/propublica/top20/:cycle/:category', pubFinance.top20List);

router.post('/users/signin', userController.signin);
router.post('/users/signup', userController.signup);
router.post('/users/update', userController.update);
router.get('/users/checkAuth', userController.checkAuth);


router.get('/test', (req, res) => {
  console.log('got it');
  res.send({ data: 'data!' });
});


module.exports = router;
