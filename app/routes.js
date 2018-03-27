const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport-local');
const Users = require('../db').Users;
module.exports = function(app,passport)
{    
// app.get('/', function(req, res) {
//         res.render('index'); // load the index.ejs file
//     });

// app.post('/signup', passport.create('local-signup', {
//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/' // redirect back to the signup page if there is an error
//     })); 
app.use((bodyParser.urlencoded({ extended: false })))
app.use(bodyParser.json());
 app.get('/signup', function(req,res) {
     res.render('../intro/index');
 })   
app.post('/signup', function(req,res){
    var a = [req.body.email,req.body.username,req.body.password];
    Users.findOne({
       where: { email: a[0],
        username: a[1],
        password: a[2],
       }
       
    }).then(users => {
        if (users) return {message: 'User already exists'};
        res.redirect('/')
    })
    Users.create({
            email: a[0],
            username: a[1],
            password: a[2],
           
      }).then(users => {
            res.redirect('/profile')
      })    
    
})

app.post('/login', passport.authenticate('local',{
    successRedirect : '/profile',
    failureRedirect : '/',
}));

// app.get('/profile',() => console.log("d"), function(req,res) {
//     res.sendHTML(path.join(__dirname,'../chat'));
// });
}
