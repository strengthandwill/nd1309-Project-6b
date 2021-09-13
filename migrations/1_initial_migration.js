var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  require('dotenv').config();
  deployer.deploy(Migrations);
};
