const express = require('express')
const app = express();
const path = require('path');
const passport = require('passport-local')
module.exports = function(app,passport)
{    
// app.get('/', function(req, res) {
//         res.render('index'); // load the index.ejs file
//     });

app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login' // redirect back to the signup page if there is an error
    }));    

app.post('/login', passport.authenticate('login',{
    successRedirect : '/profile',
    failureRedirect : '/'
}));

// app.get('/profile',() => console.log("d"), function(req,res) {
//     res.sendHTML(path.join(__dirname,'../chat'));
// });
}
