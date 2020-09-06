const { Schema, Types } = require('mongoose');
const ObjectId = Types.ObjectId;
const { name: genreName } = require('./genre');

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topGenres: {
    type: [ObjectId],
    ref: genreName,
    required: true,
    default: []
  }
}, { timestamps: true });

authorSchema.virtual('id')
  .get(function () { return this._id; })

module.exports = {
  name: "Author",
  schema: authorSchema
};