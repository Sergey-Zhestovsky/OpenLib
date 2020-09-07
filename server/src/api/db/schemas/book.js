const { Schema, Types } = require('mongoose');
const ObjectId = Types.ObjectId;
const { name: authorName } = require('./author');
const { name: genreName } = require('./genre');
const { name: userName } = require('./user');

const bookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: authorName,
    required: true
  },
  genre: {
    type: ObjectId,
    ref: genreName,
    required: true
  },
  rating: {
    type: [ObjectId],
    required: true,
    default: []
  },
}, { timestamps: { createdAt: 'date' } });

bookSchema.virtual('id')
  .get(function () { return this._id; });

bookSchema.virtual('ratingCounter')
  .get(function () { return this.rating.length; });

module.exports = {
  name: "Book",
  schema: bookSchema
};