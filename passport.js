const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users

module.exports = function(passport)
{
passport.serializeUser(function (user, done) {
    console.log("Serialize");
    done(null, user.email)
})

passport.deserializeUser(function (email, done) {
    console.log("DeSerialize");
    Users.findOne({
        email: email
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
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
    
passport.use('local-login',new LocalStrategy(function (email, password, done) {
    console.log("ZD");
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        if (user.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))
}


//exports = module.exports = passport