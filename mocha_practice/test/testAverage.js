// should 是一個 assert library
var should = require("should");
var average = require("../calculator/average");

describe("calculate average", () => {
  // 描述狀態或圈出特並區域，解釋測試的功能

  // 撰寫測試案例
  it("should return the average of the array", (done) => {
    let result = average([1, 2, 3]);
    result.should.equal(2);
    done();
  });
  it("should return NaN when no argument in array", (done) => {
    let result = average([]);
    result.should.be.NaN;
    done();
  });
});
