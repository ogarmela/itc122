let movies = require("./lib/book_module.js");

var bookMethods = require("./lib/book_module");

var Book = require("./models/book"); // use database model



const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


// get all default to web page ALL
app.get('/', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    res.render('home', {books: items }); 
  }).catch((err) =>{
    return next(err);
  });
});


// show details 
app.get('/details', (req,res,next) => {
    Book.findOne({ title:req.query.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});

// Showing details F
app.post('/details', (req,res, next) => {
    Book.findOne({ title:req.body.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});


// deleting
app.get('/delete', (req,res, next) => { 
    Book.remove({ title:req.query.title }, (err, result) => { 
        if (err) return next(err);
        let deleted = result.n !== 0; // n will be 0 if no docs deleted
        Book.count({},  (err, total) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ) => {
             res.type('text/html');
             res.render('delete', {title: req.query.title, deleted:deleted , total:total } );    
        });  
    });  
});  


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
