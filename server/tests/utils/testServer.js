const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { typeDefs, resolvers } = require('../../src/api/graphql');

const createTestServer = ctx => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx
  })

  return createTestClient(server);
}

module.exports = createTestServer;