const { Mongoose } = require('mongoose');
const schemas = require("./schemas/root");

const mongoose = new Mongoose();
schemas(mongoose);

module.exports = mongoose;