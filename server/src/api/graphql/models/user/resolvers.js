const getMe = (_, __, ctx) => {
  return ctx.db.user.getById(ctx.user.id);
};

const getUser = (_, { input }, ctx) => {
  return ctx.db.user.getById(input.id);
};

const ownComments = (_, { input }, ctx) => {
  return ctx.db.comment.getUserComments(ctx.user.id, input.limit);
};

const ownRatedBooks = (_, { input }, ctx) => {
  return ctx.db.book.getUserRatedBooks(ctx.user.id, input.limit);
};

const loginUser = (_, { input }, ctx) => {
  return ctx.user.authorize(input.email, input.password);
};

const signUpUser = (_, { input }, ctx) => {
  return ctx.user.registrate(input.email, input.password, { name: input.name });
};

module.exports = {
  Query: {
    getMe,
    getUser,
    ownComments,
    ownRatedBooks
  },
  Mutation: {
    loginUser,
    signUpUser
  }
};