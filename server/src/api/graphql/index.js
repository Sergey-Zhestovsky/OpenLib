const author = require('./models/author');
const genre = require('./models/genre');
const merge = require('lodash/merge');

module.exports = {
  typeDefs: [
    author.typeDefs,
    genre.typeDefs
  ].join(' '),
  resolvers: merge({},
    author.resolvers,
    genre.resolvers
  )
}