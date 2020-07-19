'use strict'
const express = require("express");
const bodyParser= require("body-parser");
const music = require("./data");
/*var routes = require('./routes.js')(app); // pass ‘app’ instance to the routes module*/



const app= express();


app.set('port',process.env.PORT || 3000);
app.use(express.static('index'));
app.use('/css',express.static('css')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions)

let show = require("express-handlebars"); // should be at top of module 

app.engine('handlebars', students({defaultLayout: false}));
app.set("view engine", "handlebars");

/*creating a var to get all the data from students*/
let showstudents = students.getAll();

// send static file as response
app.get('/', (req, res) => {
    res.type('text/html');
    res.sendFile('home',{students:showstudents}); 
   });
   
app.get('/detail', (req, res) => {
    const students.courses = req.query.courses
    res.render('detail', {courses: studentscourses, stats: students.getDetail(studentcourses)});
});

app.get('/About', (req, res)=>{
    res.type('text/plain');
    res.send('About page \n This is Omar Garmela, \n I\'am doing my programming degree.I probably, i will finish the following winter');
    
    // define 404 handler
   app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
   });
   app.courses(app.get('PORT'),()=>{
       console.log('express started now')
   });
