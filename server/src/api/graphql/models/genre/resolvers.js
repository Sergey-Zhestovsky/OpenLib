const getGenre = (_, { input }, ctx) => {
  return ctx.db.genre
    .getById(input.id);
};

const addGenre = (_, { input }, ctx) => {
  return ctx.db.genre
    .add(input);
};

module.exports = {
  Query: {
    getGenre
  },
  Mutation: {
    addGenre
  }
}