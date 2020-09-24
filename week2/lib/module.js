var movies_array = [
    {title:"ramlo",director:"muno mursal",releasedate:"2014"},
    {title:"Salmo",director:"Amal Jibril",releasedate:"2000"},
    {title:"Maryan dude",director:"reer Mahad",releasedate:"2016"},
    {title:"ina Omar",director:"Ruqiyo Naaje",releasedate:"2016"},
    {title:"Madino",director:" Haji Ali",releasedate:"1997"}
];

// prints out the contents of this database
exports.getAll = () => {
    return movies_array;
}

exports.get = (title) => {
    return movies_array.find((item) => {
    return item.title === title;
    });
};

exports.delete = (title) => {
    // retain array length for later comparison after array modification
    const oldSize = movies_array.length;
    movies_array = movies_array.filter((item) => {
        return item.title !== title;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldSize !== movies_array.length, total: movies_array.length };
}

exports.add = (new_movies_object) => {
    const oldLength = movies_array.length;
    // use existing get() method to check if book already in our list
    let found = this.get(new_movies_object.title);
    if (!found) {
        movies_array.push(new_movies_object);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== movies_array.length, total: movies_array.length };
};

console.log(movies_array + "\n \n");
