const { Query: { getBooks } } = require('../book/resolvers');

const getAuthor = (_, { input }, ctx) => {
  return ctx.loaders.author
    .load(input.id);
};

const getAuthors = (_, { input }, ctx) => {
  const offset = input.page * input.limit;
  return ctx.db.author
    .getList(input.limit, offset, input.search);
};


const addAuthor = (_, { input }, ctx) => {
  return ctx.db.author
    .add(input);
};

const editAuthor = (_, { input }, ctx) => {
  const { id, ...data } = input;
  return ctx.db.author
    .edit(id, data);
};

const editAuthorGenres = (_, { input }, ctx) => {
  const { id, topGenres } = input;
  return ctx.db.author
    .editGenres(id, topGenres);
};

module.exports = {
  Query: {
    getAuthor,
    getAuthors
  },
  Mutation: {
    addAuthor,
    editAuthor,
    editAuthorGenres
  },
  Author: {
    books(author, { input }, ctx, info) {
      input.authors = [author.id];
      return getBooks(author, { input }, ctx, info);
    },
    async bookCounter(author, _, ctx) {
      return (await ctx.loaders.authorBooks.load(author.id)).length;
    },
    topGenres(author, _, ctx) {
      return ctx.db.genre
        .getGenresByIds(author.topGenres);
    }
  }
}