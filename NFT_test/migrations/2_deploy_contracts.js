const LeoToken = artifacts.require("LeoToken");

module.exports = function (deployer) {
  deployer.deploy(LeoToken);
};
