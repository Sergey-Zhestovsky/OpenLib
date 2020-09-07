const getUser = (_, { input }, ctx) => {
  return ctx.db.user.geyById(input.id);
};

const verifyUser = (_, { input }, ctx) => {
  return ctx.db.user.verify(input.email, input.password);
};

const addUser = (_, { input }, ctx) => {
  return ctx.db.user.add(input);
};

module.exports = {
  Query: {
    getUser,
    verifyUser
  },
  Mutation: {
    addUser
  }
};