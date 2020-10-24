var mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = "mongodb://dbuser_one:dbuser_one123@ds141661.mlab.com:41661/allewis151_dbuser";
mongoose.connect(connectionString);

// local db connection settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/<DB_NAME>');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 director: String,
 releasedate: String

},
{collection: 'books'
}); 

module.exports = mongoose.model('Book', mySchema);
