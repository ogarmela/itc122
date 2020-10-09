var Book = require("../model/book.js");

// this prints all contents of database
exports.getAll = () => {
  return Book.find({}, (err, result) => {
    if (err) {
      return err;
    }
    // line below will print out number of items in database
    console.log(result.length);
    // LINE BELOW will render result to web-client-page
    return result;
  });
};
