var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    title: 'Page title',
    content: 'Page content'
  })
});

module.exports = router;
