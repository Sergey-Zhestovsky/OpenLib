const { authorized } = require('../../utils/middleware');

const getMe = (_, __, ctx) => {
  return ctx.db.user.geyById(ctx.user.id);
};

const getUser = (_, { input }, ctx) => {
  return ctx.db.user.geyById(input.id);
};

const authorizeUser = (_, { input }, ctx) => {
  return ctx.user.authorize(input.email, input.password);
};

const signUpUser = (_, { input }, ctx) => {
  return ctx.user.registrate(input.email, input.password, { name: input.name });
};

module.exports = {
  Query: {
    getMe: authorized(getMe),
    getUser,
    authorizeUser
  },
  Mutation: {
    signUpUser
  }
};