const author = require('./models/author');
const genre = require('./models/genre');
const book = require('./models/book');
const user = require('./models/user');
const comment = require('./models/comment');
const merge = require('lodash/merge');

module.exports = {
  typeDefs: [
    author.typeDefs,
    genre.typeDefs,
    book.typeDefs,
    user.typeDefs,
    comment.typeDefs,
  ].join(' '),
  resolvers: merge({},
    author.resolvers,
    genre.resolvers,
    book.resolvers,
    user.resolvers,
    comment.resolvers,
  )
}