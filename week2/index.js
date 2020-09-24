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
  
  let url = req.url.split("?");  // separate route from query string
  
  let query = qs.parse(url[1]); // convert query string to object
  
   console.log( JSON.stringify(query) + "\n");
  
  let path = url[0].toLowerCase();

  

  switch(path) {
    
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
      
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About');
      break;
          
    case '/get':
      res.writeHead(200, {'Content-Type': 'text/plain'});

      let found2 = movies.get(query.title); // gets SPECIFIC title
      
      let results2 = (found2) ? JSON.stringify(found2) : "Not found";
      
      res.write(results2 + "\n");
      res.end("\n");
      break;
      
    //    got getAll
    
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
