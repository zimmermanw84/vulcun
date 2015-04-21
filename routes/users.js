var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/users", function(req, res) {
    console.log("request", req)
});

module.exports = router;
