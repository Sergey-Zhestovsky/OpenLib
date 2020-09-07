const { Schema } = require('mongoose');
const crypto = require('crypto');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
}, { timestamps: true });

userSchema.virtual('id')
  .get(function () { return this._id; })

module.exports = {
  name: "User",
  schema: userSchema
};