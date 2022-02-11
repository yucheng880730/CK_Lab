var should = require("should");
var average = require("../calculator/sum");

describe("calculate sum", () => {
  it("should return the sum of the array", (done) => {
    let result = average([1, 2, 3]);
    result.should.equal(6);
    done();
  });
  it("should return NaN when no argument in array", (done) => {
    let result = average([]);
    result.should.be.NaN;
    done();
  });
});
