const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const app = express();
const port = 3000;

let request = 0;
const messageLimit = (req, res, next) => {
  if (request > 5) {
    res.status(429).json({
      message: "Too Many Requests"
    });
  } else {
    request++;
    next();
  }
  console.log("test messageLimit", request);
};

app
  .use(messageLimit)
  .use(jsonParser)

  // Add a single endpoint to the app responds to POST requests to the /messages URI.
  // When a request is sent to the endpoint, it should log the text property of the body to the console, and it should respond with a JSON object
  // Perform the following validation: if the body does NOT have a text property or the string is empty, then send a "Bad Request" HTTP status code to the client.
  // test with http -v POST http://localhost:3000/messages message=hi

  .post("/messages", (req, res) => {
    // To check isText seems to require a new library, which is not permitted for this assignment. Is assignment asking to check if null? https://www.npmjs.com/package/type-is#readme
    // if (req.body === null || req.body==='')
    // (!(req.body).isString || req.body === '')
    console.log(req.body.text);
    console.log(req.is('text/*'));  
    if (!req.body.text || req.body === "") {
      res.status(400).json({
        message: "Bad Request"
      });
      console.log("request failed");
      return;
    } else {
      //Works if I disable the validation.
      res.json({
        message: "Message received loud and clear"
      });
      console.log("request passed");
    }
  })
  .listen(port, () => console.log(`Example app listening on port ${port}!`));
