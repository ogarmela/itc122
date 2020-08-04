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
app.get('/', (req,res, next) => {
    course.find((err,courses) => {
        console.log(coursess)
        if (err) return next(err);
        res.render('home', {courses: JSON.stringify(courses)});
   });
   
app.get('/delete', (req, res) => {
    const coursesno = req.query.no;
    courses.findByIDAndDelete({title: courses}, (err, courses) => {
        
        if (err) {
            console.log(err);
        } else if (!course) {
            console.log(courses + "course not found");
            res.send(`${courseno} not found`);
        } else if (movie) {
            console.log(courseno + "Removed");
            res.send(`${coursesno} Removed`);
        }
    });

app.get('/About', (req, res)=>{
    res.type('text/plain');
    res.render('About page \n This is Omar Garmela, \n I\'am doing my programming degree.I probably, i will finish the following winter');
    
    // define 404 handler
   app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
   });
   app.courses(app.get('PORT'),()=>{
       console.log('express started now')
   });
