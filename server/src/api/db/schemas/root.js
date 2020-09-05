const author = require('./author');
const book = require('./book');
const comment = require('./comment');
const genre = require('./genre');
const user = require('./user');

module.exports = function (mongoose) {
  return {
    Author: mongoose.model(author.name, author.schema),
    Book: mongoose.model(book.name, book.schema),
    Comment: mongoose.model(comment.name, comment.schema),
    Genre: mongoose.model(genre.name, genre.schema),
    User: mongoose.model(user.name, user.schema),
  };
}