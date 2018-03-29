const socket = io();
//var arr = require('./app/routes.js')(app,passport)
socket.on('connected', (data) => {
    console.log("Connected " + socket.id)
    
})

$(function () {
    const msglist = $('#msglist')
    const sendbtn = $('#sendmsg')
    const msgbox = $('#msgbox')
    const loginbox = $('#loginbox')
    const loginbtn = $('#loginbtn')
    const loginDiv = $('#login-div')
    const chatDiv = $('#chat-div')

    const user = ''

    sendbtn.click(function () {
        socket.emit('send_msg', {
            user: arr.a[1],
            message: msgbox.val()
        })
    })

    // loginbtn.click(function () {
    //     user = loginbox.val()
    //     chatDiv.show()
    //     loginDiv.hide()
    //     socket.emit('login', {
    //         user: user
    //     })
    // })

    socket.on('recv_msg', function (data) {
        msglist.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    })
})