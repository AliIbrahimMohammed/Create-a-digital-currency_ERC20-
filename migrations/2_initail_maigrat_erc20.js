const ERC20_ALTAYB = artifacts.require("ERC20_ALTAYB");

module.exports = function (deployer) {
  deployer.deploy(ERC20_ALTAYB);
};