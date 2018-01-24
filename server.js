const express = require('express')
const session = require('express-session')
const passport = require('passport')

const app = express()

const http = require('http')
const io = require('socket.io')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'project-session'
}))
app.use(passport.initialize())
app.use(passport.session())

// app.use('/public', require('./routes/public'))
// app.use('/private', require('./routes/private'))
// app.use('/', require('./routes/root'))


const server = http.Server(app)
//     function(request, response) {
//     response.writeHeader(200, {“Content-Type”: “text/html”});
//     response.write(index);
//     response.end();
//   })
const socket = io.listen(server);
server.listen(5898, () => console.log("Server running on http://localhost:5898"))
