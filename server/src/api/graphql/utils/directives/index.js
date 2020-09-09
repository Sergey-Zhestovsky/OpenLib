module.exports = {
  schemaDirectives: require('./directives'),
  typeDefs: require('../gqlLoader')(__dirname, 'directives.graphql')
};