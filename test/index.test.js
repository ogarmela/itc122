const expect = require("chai").expect;
const course = require("../data");
const query = require('querystring');

describe("class", () => {
  /**
   * Get Test
   */
  it("returns requested book", () => {
    const result = class.get("classNO", "google");
    expect(result).to.deep.equal({classNo: "Google", classNO:"Robot #4"});
  });
  
  it("fails w/ invalid class", () => {
    const result = class.get("title", "fake");
    expect(result).to.be.undefined;
  });

    /**
   * Add Test
   */
  it("adds requested class", () => {
    // get old length
    const oldLength = class.getAll().length;

    const url = "class=test&classNo=4";
    const jsonObject = query.parse(url);
    Object.setPrototypeOf(jsonObject, class);

    const result = class.add(jsonObject);
    expect(result).to.deep.equal({added: true, total: oldLength+1});
  });
  
  it("fails w/ has been added", () => {
    // get old length
    const oldLength = class.getAll().length;

    const url = "class=test&classNo=4";
    const jsonObject = query.parse(url);
    Object.setPrototypeOf(jsonObject, class);

    const result = book.add(jsonObject);
    expect(result).to.deep.equal({added: false, total: oldLength});
  });

    /**
   * Delete Test
   */
  it("delete requested class", () => {
    const result = class.delete("classNo", "google");
    expect(result).to.deep.equal(class.getAll());
  });
  
  it("fails w/ not found to delete class", () => {
    const result = class.delete("classNo", "fake");
    expect(result).to.be.equal(-1);
  });
 });
