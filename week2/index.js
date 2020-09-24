    // need this qs for the magic to happen later with query parsing 
var qs = require("querystring");

var http = require("http"), fs = require('fs');

var movies = require('./lib/module.js');

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  console.log(__dirname + path);
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer(function(req,res){
  console.log('createServer got request');
  
         // this separates with the ? as the delimiter CHAR...
  let url = req.url.split("?");  // separate route from query string
  
         // this we will down below for query.title (title being the KEY)
         // in order to invoke get    SPECIFIC title 
         // in order to invoke delete SPECIFIC title
  let query = qs.parse(url[1]); // convert query string to object
  
  // let query2 = qs.parse(url[2]); // convert query string to object
  // let query3 = qs.parse(url[3]); // convert query string to object
  
   console.log( JSON.stringify(query) + "\n");
  // console.log( JSON.stringify(query2)   + "\n");
  // console.log( JSON.stringify(query3)   + "\n");


         // just makes every thing lowercase for lazy USER typists
         // eh ahem.... like ME 
  let path = url[0].toLowerCase();

  

  switch(path) {
    
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
      
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About:  \nThis is a fully-featured list \nmanagement web application. ');
      break;

    // UGH   got get SPECIFIC DARNIT 
    // code PARAGRAPH     B E L O W . . . 
    case '/get':
      res.writeHead(200, {'Content-Type': 'text/plain'});

      let found2 = movies.get(query.title); // gets SPECIFIC title
      
      let results2 = (found2) ? JSON.stringify(found2) : "Not found";
      
      res.write(results2 + "\n");
      res.end("\n");
      break;
      
      
    // UGH   got getAll
    // code PARAGRAPH     B E L O W . . . 
    case '/getall':                 // be lazy and keep lowercase 
      res.writeHead(200, {'Content-Type': 'text/plain'});

      let found4 = movies.getAll();         // gets ALL titles
      
      let results4 = (found4) ? JSON.stringify(found4) : "Not found";
      

      res.write(results4 + "\n");
      res.end("\n");
      break;
      


    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});

      movies.delete(query.title); // this invocation will do the deletion
           // lines below PROVE said above deletion
      let found5   = movies.getAll();
      let results5 = (found5) ? JSON.stringify(found5) : "Not found";
      res.end(results5 + "\n \n"); // delete specific movie title
      break;


      
    
    // Brenden:  I cannot quite get the format 
    // for passing in from URL query syntax format 
    // formal array
    // for example:
    //. ~/add?title=clerks,director:kevin%20smith,releasedate:1994
    //           will ADD 
    // "clerks,director:kevin smith,releasedate:1994"
    //           instead of DESIRED effect OF
    // {"title":"clerks","director":"kevin smith","releasedate":"1994"}
    // ANY HELP/consulting would be appreciated
    // this puzzle had ME HOOKED>>>>>>>>>>>>>>>
    //
    //  Please check my lib/module.js 
    //  with uncomments the console BLOCKS as director 
    //  for delete and add  CODE paragraphs as proof 
    //  of my due diligence...  AND .... my head-scratching....
    //          UGH>>>>>>>>>>>>> ME GRIMLOCK TIRED NOW
    //          ME, GRIMLOCK CODE GO TAKE NAP TIME NOW
    //
    // GRIMLOCK thanks Brenden for consults
    //  use   ~/add?title=clerks&director=kevin smith&releasedate=1994
    //  ANDDDDD movies.add(query); // for entire OBJECT 
    //             not just segment of object like movies.get(query.title)
    //                                        like movies.delete(query.title)
    case '/add':
      res.writeHead(200, {'Content-Type': 'text/plain'});

      movies.add(query); // this invocation will do the deletion
           // lines below PROVE said above addition
      let found6   = movies.getAll();
      let results6 = (found6) ? JSON.stringify(found6) : "Not found";
      res.end(results6 + "\n \n"); // delete specific movie title
      break;


      
      
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: ERROR   Page not found.  ');
  }
  
}).listen(process.env.PORT || 3000);
console.log('after createServer');
