const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users
module.exports = function(passport)
{
    console.log("passport is working");
passport.serializeUser(function (users, done) {
    console.log("Serialize");
    done(null, users.id)
})
// function findById(id, fn) {
//     Users.findById(id).
//  }
//  function (err, users) {
//     
//     done(err, users);
//   });
passport.deserializeUser(function (id, done) {
    console.log("DeSerialize");
    Users.findById(id).then((users) => {
        console.log(users);
        return done(null, users);
    });
})

passport.use(new LocalStrategy(
    function(username, password, done) {
      Users.findOne({where:{ username: username} },
        function(err, users) {
            if (err) { return done(err); }
            if (!users) {
            return done(null, false, { message: 'Incorrect username.' });
            }
            if (!users.password === password) {
            return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, users);
        });
    }
));
   
}



