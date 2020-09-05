const { gql } = require('apollo-server');

module.exports = {
  typeDefs: gql`
  type Message {
    message: String!
  }

  input HelloInput {
    message: String!
  }

  type Query {
    hello(input: HelloInput): Message!
  }
  `,
  resolvers: {
    Query: {
      hello: (_, args, ctx, info) => ({ message: `${args.input.message} world` })
    }
  },
  context: {

  }
}