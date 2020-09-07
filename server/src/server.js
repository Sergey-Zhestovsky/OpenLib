const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const config = require('./_config');
const { User, session: { SessionManager, sessionStorage } } = require('./api/auth/');
const { typeDefs, resolvers } = require('./api/graphql');
const { actions } = require('./api/db');

const { session: sessionConf } = config;
const sessionManager = new SessionManager({
  storage: sessionStorage,
  secret: sessionConf.secret,
  sessionType: SessionManager.Type.Default,
  cookie: {
    sessionName: sessionConf.session_name,
    tokenName: sessionConf.token_name,
    maxAge: sessionConf.expires_time
  }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req, res }) {
    const user = new User({
      session: await sessionManager.createSession(req, res)
    });
    return {
      user,
      db: actions,
      //loaders: loaders api
    };
  },
  playground: {
    settings: {
      "request.credentials": 'same-origin'
    }
  }
});
app.use(server.getMiddleware({ path: "/" }));

app.listen({ port: config.port }, () => {
  console.log(`Server ready at http://localhost:${config.port}/`);
});