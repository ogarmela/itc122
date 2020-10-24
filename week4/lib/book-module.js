var Book = require("../model/book.js");

// print database
exports.getAll = () => {
  return Book.find({}, (err, result) => {
    if (err) {
      return err;
    }
    // print out database
    console.log(result.length);
    // render result to web-client-page
    return result;
  });
};
