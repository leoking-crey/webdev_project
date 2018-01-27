const route = require('express').Router()
const Users = require('../db').Users()
const passport = require('passport-local')

route.get('/login', (req, res) => {
    res.render('login')
})
route.get('/signup', (req, res) => {
    res.render('signup')
})
route.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '../chat'
}))

route.post('/signup', (req, res) => {
    Users.create ({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        
    }).then((createdUser) => {
        res.redirect('/login')
    })
})

exports = module.exports = route;
