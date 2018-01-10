const express = require('express')
const session = require('express-session')
const passport = require('passport')

const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'project-session'
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/public', require('./routes/public'))
app.use('/private', require('./routes/private'))
app.use('/', require('./routes/root'))

app.listen(5898, () => console.log("Server running on http://localhost:5898"))