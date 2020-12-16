var Book = require("../models/book.js");

// THIS prints out ALL contents of this database
exports.getAll = () => {
  return Book.find({}, (err, result) => {
    if (err) {
      return err;
    }
    // LINE BELOW will print out number of items in database
    console.log(result.length);
    // LINE BELOW will render result to web-client-page
    return result;
  });
};
