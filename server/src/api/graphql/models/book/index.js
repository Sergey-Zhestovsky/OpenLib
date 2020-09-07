module.exports = {
  resolvers: require('./resolvers'),
  typeDefs: require('../../utils/gqlLoader')("book/book.graphql")
};