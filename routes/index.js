var express = require('express');
var router = express.Router();
var models = require('../models');
var db = require("../models/index");
var bcrypt = require('bcryptjs');



// Auth Middleware
var authUser = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

 // GET home page.
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

// Handle Session. Would break these out into there own routes files in real world app

router.post('/login', function(req, res) {
  // Would normally find by email for uniqueness or make username validation for uniqueness
  // Would never pass direct form values directly to query >.<

  var user = models.user.findOne({ where: { username: req.body.username } })
      .success(function(user) {
        if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
            req.session.user = user.dataValues;
            res.redirect('/users')
        } else {
            res.send('Incorrect username or password')
        }
      })
      .error(function(err) {
      res.send('No user found')
  });
});

router.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('/');
});

// Search Routes

router.post('/search', function(req, res) {
  var searchParams = JSON.stringify(req.body.search);
  console.log(searchParams);
  db.sequelize.query('SELECT * FROM users WHERE profile LIKE ' + "'%"+req.body.search+"%'" , models.user
  ).then(function(users) {
        res.end( JSON.stringify(users) )
      })
      .fail(function(err) {
        res.send('Something went wrong. Try again')
      })
});

router.post('/users/profile', function(req, res) {
  // TODO: Can only update all values at the moment
  var user = models.user.findOne({ where: { username: req.session.user.username } })
      .then(function(user) {
        user.updateAttributes({
          profile: JSON.stringify(req.body)
        }).then(function(user) {
          res.end(JSON.stringify(req.body));
        }).fail(function (err) {
          res.send('Something went wrong. Try again')
        })
      });
});

// Handle user auth and creation
router.get('/users', authUser, function(req, res) {

  var user = models.user.findOne({ where: { username: req.session.user.username } })
      .then(function(user) {res.locals.user = req.session.user;
        res.locals.profile = JSON.parse(user.dataValues.profile);
        res.render('user.ejs');
      })
      .fail(function (err) {
        res.send('Something went wrong. Try again')
      });
});

router.post('/users', function(req, res) {

    // Hash User Password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    var user = models.user.create({
        username: req.body.username,
        password: hash,
        profile: JSON.stringify({phone: "none", country: "none", email: "none"})
    }).then(function(user) {
            req.session.user = user.dataValues;
            res.redirect('/users');
    }).fail(function (err) {
        res.send('Something went wrong. Try again')
    });


});



module.exports = router;
