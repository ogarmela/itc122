const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const app = express();
const port = 3000;

let request = 0;
const classLimit = (req, res, next) => {
  if (request > 5) {
    res.status(429).json({
      class: "Too Many Requests"
    });
  } else {
    request++;
    next();
  }
  console.log("test class", request);
};

app
  .use(classLimit)
  .use(jsonParser)

  
  .post("/class", (req, res) => {
    // if (req.body === null || req.body==='')
    // (!(req.body).isString || req.body === '')
    console.log(req.body.text);
    console.log(req.is('text/*'));  
    if (!req.body.text || req.body === "") {
      res.status(400).json({
        class: "Bad Request"
      });
      console.log("request failed");
      return;
    } else {
      //Works if I disable the validation.
      res.json({
        class: "class taken many"
      });
      console.log("request passed");
    }
  })
  .listen(port, () => console.log(`Example app class on port ${port}!`));
