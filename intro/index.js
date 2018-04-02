$(function(){
    const submit = $('#submit');
    const save = $('#save');
    const email = $('#email');
    const username = $('#username');
    const password = $('#password');
    const userlogin = $('#Userlogin');
    const passlogin = $('#Passlogin');
    save.click(function(e){
        e.preventDefault();
        $.post('/signup',{
            email:email.val(),
            username:username.val(),
            password:password.val()
        }, function(data){
            console.log(1)
            if(data.username){
            localStorage.setItem("username",data.username)
            }
            window.location.href = data.url
        })
    })
    // submit.click(function(e){
    //     e.preventDefault();
    //     $.post('/login',{
    //         username:userlogin.val(),
    //         password:passlogin.val()
    //     }, function(data){
    //         window.location.href = data.url
    //     })
    // })
    

})