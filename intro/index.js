$(function(){
    const email = ('#ExampleInputEmail1')
    const username = ('#formGroupExampleInput2')
    const password = ('#ExampleInputPassword1')
    const signup = ('#btn1')
    signup.onclick(){
        const var1 = email.val()
        const var2 = username.val()
        const var3 = password.val()
        $.post('./route',{task:newuser},function(){

        })
    }
    

})