'use strict'

let movies = require("./lib/book_module.js");

var bookMethods = require("./lib/book_module");

var Book = require("./models/book"); // use database model



const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: true}));
//app.use('/api',require('cors')());
//app.use('/api',require('cors')()); // set Access-Control-Allow-Origin header for api route

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


// GET ALL DEFAULT TO WEB PAGE
app.get('/', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    res.render('home', {books: items }); 
  }).catch((err) =>{
    return next(err);
  });
});


//  USE THIS FOR JSON FORMAT of LIST OUT ALL 
//  DETAILS OF JSON
// API showing ALL titles
app.get('/api/books', (req,res, next) => {
  bookMethods.getAll().then((items) => {
    if (!items){
      return res.status(500).send('Error occurred: database error.');
    }
    res.json(items); 
  }).catch((err) =>{
    return res.status(500).send('Error occurred: database error.');
  });
});


// API showing one title only
app.get('/api/books/:title', (req,res, next) => {
  Book.findOne({ title:req.params.title }).then((item) => {
    if (!item){
      return res.status(500).send('Error occurred: database error.');
    }
    res.json(item); 
  }).catch((err) =>{
    return res.status(500).send('Error occurred: database error.');
  });
});


// API deleting one title only
app.get('/api/books/delete/:title', (req,res, next) => {
  Book.remove({ title:req.params.title }).then((item) => {
    if (!item){
      return res.status(500).send('Error occurred: database error.');
    }
    res.json(item); 
  }).catch((err) =>{
    return res.status(500).send('Error occurred: database error.');
  });
});
   

// debugging with BW  08/02/2018 5:00 PM
// API showing one title only add one title only 
app.post('/api/books/add', (req,res, next) => {
  Book.update({ 'title': req.body.title }, req.body, { upsert: true }, (err, result) => {
    console.log(err);
    if (err) {
      res.json({'status':'error', 'message': err});
    } else {
      res.json({'status':'success'});
    }
        console.log(result);
  });
});


// FOR SHOWING DETAILS
app.get('/details', (req,res,next) => {
    Book.findOne({ title:req.query.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});

// FOR SHOWING DETAILS
app.post('/details', (req,res, next) => {
    Book.findOne({ title:req.body.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});


// FOR DELETING
app.get('/delete', (req,res, next) => { // FLAG A
    Book.remove({ title:req.query.title }, (err, result) => { // FLAG B
        if (err) return next(err);
        let deleted = result.n !== 0; // n will be 0 if no docs deleted
        Book.count({},  (err, total) => {  // FLAG C                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ) => {
             res.type('text/html');
             res.render('delete', {title: req.query.title, deleted:deleted , total:total } );    
        });  // FLAG C
    });  // FLAG B
});  // FLAG A


// send plain text response
// for the ABOUT PAGE
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
