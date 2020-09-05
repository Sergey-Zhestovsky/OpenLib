const { Schema } = require('mongoose');

const genreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
}, { timestamps: true });

genreSchema.virtual('id')
  .get(function () { return this._id; })

module.exports = {
  name: "Genre",
  schema: genreSchema
};