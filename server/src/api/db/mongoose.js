const MongoInterface = require('./MongoInterface');
const schemas = require('./schemas/root');
const { mongodb } = require('../../_config');

const mongoose = new MongoInterface(schemas, mongodb.url, mongodb.options);

module.exports = {
  dbInterface: mongoose,
  mongoose: mongoose.mongoose
};