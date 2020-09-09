module.exports = {
  resolvers: require('./resolvers'),
  typeDefs: require('../../utils/gqlLoader')(__dirname, 'book.graphql')
};