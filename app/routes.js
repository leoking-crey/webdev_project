module.exports = function(app,passport)
{
app.get('/', function(req, res) {
        res.render('index'); // load the index.ejs file
    });
app.get('/signup', function(req,res) {
    res.send("This is signed up !");
})
app.get('/profile', function(req,res) {
    res.send("This is signed up profile!");
})

app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup' // redirect back to the signup page if there is an error
    }));    
}

