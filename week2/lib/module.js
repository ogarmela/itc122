var movies_array = [
    {title:"clerks",director:"kevin smith",releasedate:"1994"},
    {title:"bullitt",director:"peter yates",releasedate:"1968"},
    {title:"gran torino",director:"clint eastwood",releasedate:"2008"},
    {title:"logans run",director:"michael anderson",releasedate:"1976"},
    {title:"silverado",director:"lawrence kasdan",releasedate:"1985"}
];

// THIS prints out ALL contents of this database
exports.getAll = () => {
    return movies_array;
}
// UNCOMMENT LINES BELOW TO TEST getAll functionality
// console.log(this.getAll());
// console.log();
// console.log();
// console.log();




exports.get = (title) => {
    return movies_array.find((item) => {
    return item.title === title;
    });
};
// UNCOMMENT LINES BELOW TO TEST get SPECIFIC TITLE functionality
// console.log(this.get("clerks"));
// console.log();
// console.log();
// console.log();
// console.log();




exports.delete = (title) => {
    // retain array length for later comparison after array modification
    const oldSize = movies_array.length;
    movies_array = movies_array.filter((item) => {
        return item.title !== title;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldSize !== movies_array.length, total: movies_array.length };
}
// UNCOMMENT LINES BELOW TO TEST delete functionality
// console.log(this.delete("clerks"));  // delete title(s) with "clerks"
// console.log(this.getAll());          // verifies DELETION
// console.log();
// console.log();
// console.log();
// console.log();



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
// UNCOMMENT LINES BELOW TO TEST add functionality
// console.log(this.add({title:"clerks",director:"frank herbert",releasedate:"1994"}));
// console.log(this.getAll());
// console.log();
// console.log();
// console.log();
console.log(movies_array + "\n \n");
