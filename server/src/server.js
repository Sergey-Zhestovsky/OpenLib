const { ApolloServer } = require('apollo-server');
const config = require('./_config');
const graphql = require('./api/graphql');

const server = new ApolloServer(graphql);

server.listen(config.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});