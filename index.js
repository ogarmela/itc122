// this is sample file
const http = require("http");
const students = require("http");


/*creating a var to get all the data from students*/
let showstudents = students.getAll();


http.createServer(
    (req,res) => {
        const path = req.url.toLowerCase();
        switch(path) {
            case '/':
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Home page\n' + 'arraylenght:'+ showstudents.length);
                break;
            case '/about':
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('About page \n This is Omar Garmela, \n I\'am doing my programming degree.I probably, i will finish the following winter');
                break;
            default:
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not found');
                break;
        }
    }).listen(process.env.PORT || 3000);




