const { ApolloServer } = require('apollo-server');
const config = require('./_config');
const { typeDefs, resolvers } = require('./api/graphql');
const { actions } = require('./api/db');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return {
      //auth: auth api
      user: {
        isAuthorized: true,
        id: "5f5435f32a2ea81e74e4abd3"
      },
      db: actions
      //loaders: loaders api
    };
  }
});

server.listen(config.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});