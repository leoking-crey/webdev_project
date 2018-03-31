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
function findById(id, fn) {
    User.findOne(id).exec(function (err, user) {

    if (err) {
     return fn(null, null);
    } else {
     return fn(null, user);
   }
    });
 }
passport.deserializeUser(function (id, done) {
    console.log("DeSerialize");
    findById(id, function (err, user) {
        console.log(user);
        done(err, user);
      });
})

passport.use(new LocalStrategy(
    function(username, password, done) {
      Users.findOne({ username: username },
        function(err, users) {
            if (err) { return done(err); }
            if (!users) {
            return done(null, false, { message: 'Incorrect username.' });
            }
            if (!users.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, users);
        });
    }
));
   
}



