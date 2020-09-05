const { Mongoose } = require('mongoose');
const { mongodb } = require('../../_config');
const connectionFn = require("./connection");
const actions = require("./actions/root");
const schemas = require("./schemas/root");


const mongoose = new Mongoose();
schemas(mongoose);
const connection = connectionFn(mongoose, mongodb.url, mongodb.options);

module.exports = {
  mongoose,
  connection,
  actions
}