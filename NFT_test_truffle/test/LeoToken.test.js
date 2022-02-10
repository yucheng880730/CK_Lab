const LeoToken = artifacts.require("LeoToken");

contract("LeoToken", function () {
  const tokenName = "LeoToken";
  const tokenSymbol = "LEO";

  it(`should return Name:${tokenName}, Symbol:${tokenSymbol}`, async () => {
    let instance = await LeoToken.deployed();
    let name = await instance.name.call();
    let symbol = await instance.symbol.call();

    assert.equal(name, tokenName, "Name incorrect");
    assert.equal(symbol, tokenSymbol, "Symbol incorrect");
  });
});
