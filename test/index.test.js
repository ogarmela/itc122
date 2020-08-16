'use strict'
const expect = require("chai").expect;
const book = require("./class");

describe("class", function() {
    
    it("returns requested class", function() {
        let result = class.get("omar");
        expect(result).to.deep.equal({class: "omar", omar:"omar"});
    });
    
    it("fails to return an w/ invalid class", function() {
        let result = class.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new class", function() {
        let result = class.add({classno: "class"});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing class", function() {
        let result = class.add({classno: "season", class:"fall", date:2020});
        expect(result.added).to.be.false;
    });

    it("deletes an existing class", function() {
        let result = class.delete("season");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid class", function() {
        let result = class.delete("omar");
        expect(result.deleted).to.be.false;
    });

});
