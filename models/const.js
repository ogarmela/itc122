const class = require("../models/class")

class.find({}).lean()
    .then((class) => {
        console.log();class
    })    
.catch(err => console.log(err));
//class.find({}).lean()
