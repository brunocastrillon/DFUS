const FileManage = artifacts.require("FileManage");

module.exports = function (deployer) {
  deployer.deploy(FileManage);
};
