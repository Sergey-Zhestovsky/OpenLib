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
  userPassword: {
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

userSchema.virtual('password')
  .set(function (password) {
    this.salt = crypto.randomBytes(10).toString('hex');
    this.userPassword = this.encryptPassword(password);
  })
  .get(() => this.userPassword)

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
}
userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.userPassword;
}


module.exports = {
  name: "User",
  schema: userSchema
};