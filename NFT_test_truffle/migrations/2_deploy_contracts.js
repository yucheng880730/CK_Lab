const LeoToken = artifacts.require("LeoToken");

module.exports = async function (deployer) {
  await deployer.deploy(LeoToken);
};
