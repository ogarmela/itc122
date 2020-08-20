const mongoose = require("mongoose");
const credentials = require("../credentials");
// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.connectionString, { dbName: "movies.project", useNewUrlParser: true }); 
mongoose.set('useFindAndModify', false);
mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  type:String,
  year: Number
 }); 
 
 module.exports = mongoose.model('Movie', mySchema,"Movies");
