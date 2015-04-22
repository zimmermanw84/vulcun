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
  res.render('index.ejs');
});

// Handle Session. Would break these out into there own routes files in real world app

router.post('/login', function(req, res) {
  // Would normally find by email for uniqueness or make username validation for uniqueness
  // Would never pass direct form values directly to query >.<

  var user = models.user.findOne({ where: { username: req.body.username } })
      .success(function(user) {
        req.session.user = user.dataValues;
        res.redirect('/users')
      })
      .error(function(err) {
  //    Handle error NO USER Found
      res.send('No user found')
  });
});

router.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('/');
});


// Handle user
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
