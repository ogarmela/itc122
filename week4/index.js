'use strict'

let movies = require("./lib/book_module.js");

var bookMethods = require("./lib/book_module");

var Book = require("./models/book"); // database



const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allow  navigation
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


// get web page
app.get('/', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    res.render('home', {books: items }); 
  }).catch((err) =>{
    return next(err);
  });
});


// details
app.get('/details', (req,res,next) => {
    Book.findOne({ title:req.query.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});

// FOR DETAILS
app.post('/details', (req,res, next) => {
    Book.findOne({ title:req.body.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});


// FOR DELETING
app.get('/delete', (req,res, next) => { 
    Book.remove({ title:req.query.title }, (err, result) => { 
        if (err) return next(err);
        let deleted = result.n !== 0; 
        Book.count({},  (err, total) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ) => {
             res.type('text/html');
             res.render('delete', {title: req.query.title, deleted:deleted , total:total } );    
        });  
    });  
});  


// about page
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
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
