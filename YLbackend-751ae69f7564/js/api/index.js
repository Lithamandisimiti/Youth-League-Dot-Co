//api/index.js
var express = require('express');
var router = express.Router();

router.use('/upload', require('./upload'));
router.use('/mailer', require('./yl-mailer'));

module.exports = router;
