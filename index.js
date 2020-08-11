"use strict"

let course = require("./data");

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

const exphbs =  require("express-handlebars");
app.engine('hbs', exphbs({defaultLayout: false}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    res.render('home', {classes: class.getAll()}); 
});

// send plain text response
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send(''About page \n This is Omar Garmela, \n I\'am doing my programming degree.I probably, i will finish the following winter');
});

// handle GET 
app.get('/delete', function(req,res){
    let result = class.delete(req.query.no); // delete course object
    res.render('delete', {no: req.query.no, result: result});
});

app.get('/detail', function(req,res){
    console.log(req.query)
    var found = class.get(req.query.no);
    res.render("details", {
        no: req.query.no, 
        result: found
        }
    );
});

// handle POST
app.post('/detail', function(req,res){
    console.log(req.body)
    var found = class.get(req.body.no);
    res.render("details", {no: req.body.no, result: found, claases: class.getAll()});
});

// define 404 handler
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});
