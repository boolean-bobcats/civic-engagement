const express = require('express');
const Google = require('./api/google.js');

const router = express.Router();

router.get('/representatives/:address', Google.getReps);
router.get('/voting/:address', Google.getVoterInfo);

module.exports = router;
