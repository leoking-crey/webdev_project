const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const port=process.env.PORT || 5100;

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const cookieparser = require('cookie-parser')
const bodyParser   = require('body-parser');
//const ejs = require('ejs')
app.set('views',path.join(__dirname , 'chat'));

app.set('view engine','html');
var port = process.env.PORT || 5898;
app.use('/', express.static(path.join(__dirname, 'intro')));
app.use('/profile', express.static(path.join(__dirname, 'chat')));
//app.use(bodyParser().urlencoded({extended: true}));
app.use(express.json());
//app.use(express.urlencoded({extended: true}))


app.use(session({
    secret: 'project-session',
    resave: true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())
require('./passport')(passport);
require('./app/routes.js')(app, passport);
// models.sequelize.sync().then(() => {
//     console.log("nice")
// }).catch((err) => {
//     console.log(err)
// });
// var usersockets = {}

io.on('connection', (socket) => {
    console.log("New socket formed from " + socket.id)
    socket.emit('connected')

    socket.on('login', (data) => {
        // username is in data.user
        usersockets[data.username] = socket.id
        console.log(usersockets)
    })    
    socket.on('draw', (data) => {
          console.log(data);
          io.emit('draw', data);
    })
        
    socket.on('send_msg', (data) => {
        if (data.message.startsWith('@')) {
            var recipient = data.message.split(':')[0].substr(1)
            var rcptSocket = usersockets[recipient]
            io.to(rcptSocket).emit('recv_msg', data)
        } else {
           // socket.broadcast.emit('recv_msg', data)
            io.emit('recv_msg',data);
        }
    })

})


app.listen(port, () => console.log("Server running on http://localhost:5898"))
