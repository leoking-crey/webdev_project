const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users

module.exports = function(passport)
{
passport.serializeUser(function (user, done) {
    console.log("Serialize");
    done(null, user.username)
})

passport.deserializeUser(function (username, done) {
    console.log("DeSerialize");
    Users.findOne({
        username: username
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
})

passport.use('local-signup',new LocalStrategy(function (username, password, done) {
    console.log("ZD");
    Users.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
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
    
passport.use('login',new LocalStrategy(function (username, password, done) {
    console.log("ZD");
    Users.findOne({
        where: {
            username: username
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