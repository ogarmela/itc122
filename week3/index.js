'use strict'
const expect = require("chai").expect;
const book = require("../lib/book");

describe("Book", function() {
    
    it("returns requested book", function() {
        let result = book.get("Salmo");
        expect(result).to.deep.equal({title: "Salmo", author:"Muno Mursal", pubdate:2018});
    });
    
    it("fails to return an w/ invalid book", function() {
        let result = book.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new book", function() {
        let result = book.add({title: "Salmo Jibriil", author:"Mursa Mursal", pubdate:2018});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing book", function() {
        let result = book.add({title: "Salmo", author:"Mursal Mursal", pubdate:2018});
        expect(result.added).to.be.false;
    });

    it("deletes an existing book", function() {
        let result = book.delete("Salmo");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid book", function() {
        let result = book.delete("She is very religious");
        expect(result.deleted).to.be.false;
    });

});
