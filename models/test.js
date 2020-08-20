const class_test = require('./models/class');

// class.find({}, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     else{
//         return
//     }
// });
class_test.find({}).lean()
  .then((result) => {
    console.log(result);
  })
  .catch(err => next(err))
