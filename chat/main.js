const socket = io();

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
            user: localStorage.getItem("username"),
            message: msgbox.val()
        })
    })

    socket.on('recv_msg', function (data) {
        msglist.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    })
})