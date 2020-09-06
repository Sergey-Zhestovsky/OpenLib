const getAuthor = (_, { input }, ctx) => {
  return ctx.db.author
    .getById(input.id);
};

const addAuthor = (_, { input }, ctx) => {
  return ctx.db.author
    .add(input);
};

const editAuthor = (_, { input }, ctx) => {
  const { id, data } = input;
  return ctx.db.author
    .edit(id, data);
};

const editAuthorsGenres = (_, { input }, ctx) => {
  const { id, data } = input;
  return ctx.db.author
    .editGenres(id, data);
};

module.exports = {
  Query: {
    getAuthor
  },
  Mutation: {
    addAuthor,
    editAuthor,
    editAuthorsGenres
  },
  Author: {
    topGenres(project, _, ctx) {
      return ctx.db.genre
        .getGenresByIds(project.topGenres);
    }
  }
}