module.exports = {
  resolvers: require('./resolvers'),
  typeDefs: require('../../utils/gqlLoader')(__dirname, 'genre.graphql')
};