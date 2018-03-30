const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const cookieparser = require('cookie-parser')
const bodyParser   = require('body-parser');
const ejs = require('ejs')
app.set('views',path.join(__dirname , 'chat'));

app.set('view engine','html');
//app.engine('html',ejs.renderFile);
var port = process.env.PORT || 5898;
app.use('/', express.static(path.join(__dirname, 'intro')));
app.use('/profile', express.static(path.join(__dirname, 'chat')));
//app.use(bodyParser());
require('./passport')(passport);
require('./app/routes.js')(app, passport);
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(session({
    secret: 'project-session'
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use('/public', require('/routes/public'))
// app.use('/private', require('./routes/private'))
// app.use('/', require('./routes/root'))

 //app.use('/login', express.static(path.join(__dirname, 'chat')))

var usersockets = {}

io.on('connection', (socket) => {
    console.log("New socket formed from " + socket.id)
    socket.emit('connected')

    // socket.on(true, (data) => {
    //     // username is in data.user
    //     usersockets[socket.id] = data.user
    //     console.log(usersockets)
    // })
    
    socket.on('send_msg', (data) => {
        // if we use io.emit, everyone gets it
        // if we use socket.broadcast.emit, only others get it
        if (data.message.startsWith('@')) {
            var recipient = data.message.split(':')[0].substr(1)
            var rcptSocket = usersockets[recipient]
            io.to(rcptSocket).emit('recv_msg', data)
        } else {
           // socket.broadcast.emit('recv_msg', data)  
           io.emit('recv_msg',data)          
        }
    })

})


app.listen(port, () => console.log("Server running on http://localhost:5898"))