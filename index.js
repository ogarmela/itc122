// this is sample file
const http = require("http");

http.createServer(
    (req,res) => {
        const path = req.url.toLowerCase();
        switch(path) {
            case '/':
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Home page');
                break;
            case '/about':
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('About page');
                break;
            default:
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not found');
                break;
        }
    }).listen(process.env.PORT || 3000);
/*
var myObj, x;
myObj = {
    "name":"25",
    "age":25,
    "girls":[ "Muna", "Salma", "Fadumo" ]
};
x = myObj.girls[0];

 */



