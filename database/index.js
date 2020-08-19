var express = require("express");
var app = express();
var class = require("./models/class"); // use database model

var class = require("./class");

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/./public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err)
})

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".main", handlebars({extname: '.main', defaultLayout: 'main' }));
app.set(" engine", "data");


app.get('/', (req,res) => {
    class.find({}).lean()
        .then((class) => {
            res.render('home', { class });
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/data');
    res.render('about');
});

app.get('/detail', (req,res,next) => {
    class.findOne({ classno:req.query.classno }).lean()
        .then((book) => {
            res.render('details', {result: class} );
        })
        .catch(err => next(err));
});

app.post('/get', (req,res, next) => {
    class.findOne({ classno:req.body.classno }).lean()
        .then((class) => {
            res.render('details', {result: class} );
        })
        .catch(err => next(err));
});

app.get('/delete', (req,res) => {
    class.remove({ classno:req.query.classno }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        class.count((err, total) => {
            res.type('text/data');
            res.render('delete', {class: req.query.classno, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

// api's
app.get('/api/v1/class/:class', (req, res, next) => {
    let title = req.params.classno;
    console.log(classno);
    class.findOne({classno: classno}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/class', (req,res, next) => {
    class.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:classno', (req,res, next) => {
    class.remove({"classno":req.params.classno }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.get('/api/v1/add/:classno/:omar/:omar', (req,res, next) => {
    // find & update existing item, or add new 
    let classno = req.params.classno;
    class.update({ classno: classno},  {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});
