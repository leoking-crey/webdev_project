const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users

module.exports = function(passport)
{
passport.serializeUser(function (users, done) {
    console.log("Serialize");
    done(null, users.username)
})

passport.deserializeUser(function (users, done) {
    console.log("DeSerialize");
    Users.findOne({
        username: users.username
    }).then((users) => {
        if (!users) {
            return done(new Error("No such user"))
        }
        return done(null, users)
    }).catch((err) => {
        done(err)
    })
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



