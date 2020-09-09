const { dbInterface } = require('./mongoose');
const actions = require("./actions/root");

dbInterface.connect();

module.exports = {
  MongoInterface: require('./MongoInterface'),
  connections: {
    "OpenLibDB": {
      dbInterface,
      actions
    }
  }
};