const mongoose = require('./mongoose');
const { mongodb } = require('../../_config');
const connectionFn = require("./connection");
const actions = require("./actions/root");

const connection = connectionFn(mongoose, mongodb.url, mongodb.options);

module.exports = {
  mongoose,
  connection,
  actions
};