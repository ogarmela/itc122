"use strict"

let course = require("../lib/course.js");

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

const exphbs =  require("express-handlebars");
app.engine('hbs', exphbs({defaultLayout: false}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    res.render('home', {courses: course.getAll()}); 
});

// send plain text response
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

// handle GET 
app.get('/delete', function(req,res){
    let result = course.delete(req.query.no); // delete course object
    res.render('delete', {no: req.query.no, result: result});
});

app.get('/detail', function(req,res){
    console.log(req.query)
    var found = course.get(req.query.no);
    res.render("details", {
        no: req.query.no, 
        result: found
        }
    );
});

// handle POST
app.post('/detail', function(req,res){
    console.log(req.body)
    var found = course.get(req.body.no);
    res.render("details", {no: req.body.no, result: found, courses: course.getAll()});
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
