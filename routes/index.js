var express = require('express');
var router = express.Router();
var models = require('../models');


// Auth Middleware
var authUser = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});


router.get('/users', authUser, function(req, res) {
  //console.log(req.session.user);
  res.locals.user = req.session.user;
  res.render('user.ejs');
});

router.post('/users', function(req, res, next) {
  var user = models.user.build(req.body);

  if ( user.save() ) {
    req.session.user = user.dataValues;
    res.redirect('/users');
  } else {
    res.send('Something went wrong. Try again')
  }

});


module.exports = router;
