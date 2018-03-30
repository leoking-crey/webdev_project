const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users
//var arr = require('/app/routes.js').a;
module.exports = function(passport)
{
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

// passport.use('local-signup',new LocalStrategy(function (username, password, done) {
//     console.log("ZD");
//     Users.create({
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//     }).then((user) => {
//         if (!user) {
//             return done(null, false, {message: "No such user"})
//         }
//         if (user.password !== password) {
//             return done(null, false, {message: "Wrong password"})
//         }
//         return done(null, user)
//     }).catch((err) => {
//         return done(err)
//     })
// }))
    
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



