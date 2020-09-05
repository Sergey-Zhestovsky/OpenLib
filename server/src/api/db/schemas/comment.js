const { Schema, Types } = require('mongoose');
const ObjectId = Types.ObjectId;
const { name: authorName } = require('./author');
const { name: bookName } = require('./book');
const { name: userName } = require('./user');

const commentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: userName,
    required: true
  },
  rating: {
    type: [ObjectId],
    ref: userName,
    required: true,
    default: []
  },
  subject: {
    type: ObjectId,
    refPath: 'onModel',
    required: true
  },
  onModel: {
    type: String,
    enum: [authorName, bookName],
    required: true
  }
}, { timestamps: true });

commentSchema.virtual('id')
  .get(function () { return this._id; })

module.exports = {
  name: "Comment",
  schema: commentSchema
};