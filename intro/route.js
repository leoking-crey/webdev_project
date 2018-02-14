var express = require('express')
var route = express()
var bodyparser = require('body-parser')
var Users = require('../db').Users()
var passport = require('passport-local')

route.use(bodyParser.urlencoded({
    extended: false;
 }));
 
 route.use(bodyParser.json());


route.get('/login', (req, res) => {
    res.render('login')
})
route.get('/signup', (req, res) => {
    res.render('signup')
})
// route.post('/login', passport.authenticate('local', {
//     failureRedirect: '/',
//     successRedirect: '../chat'

// }))
route.post(
    '/login', 
    passport.authenticate('local', {
        successRedirect: '../chat',
        failureRedirect: '/', 
       failureFlash: false, 
       badRequestMessage: 'Please enter your account credentials to login.'
    }), 
    function(req, res) {
        console.log(req.param('remember'));
        if(req.isAuthenticated(req, res)) {
            res.redirect('../chat');
        } else {
            var errors = req.flash('error');
            if(errors) {
                assign['errors'] = errors;
            }
            res.render('index.html', {errors: errors});
        }
    }
);

route.post('/signup', (req, res) => {
    Users.create ({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        
    }).then((createdUser) => {
        res.redirect('/login')
    })
})

module.exports.route = route;

route.listen(5898);
