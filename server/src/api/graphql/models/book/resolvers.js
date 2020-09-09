const getBook = (_, { input }, ctx) => {
  return ctx.db.book.getById(input.id);
};

const getBooks = (_, { input }, ctx) => {
  const {
    limit, page, authors, genres, sort: { sortField, sortValue }, search } = input;

  return ctx.db.book.getList({
    limit,
    offset: page * limit,
    authorIds: authors,
    genreIds: genres,
    sortField,
    sortValue,
    search
  });
};

const getSimilar = (_, { input }, ctx) => {
  return ctx.db.book.add(input.id, input.limit, ctx.user.id);
};

const addBook = (_, { input }, ctx) => {
  return ctx.db.book.add(input);
};

const editBook = (_, { input }, ctx) => {
  const { id, ...data } = input;
  return ctx.db.book.edit(id, data);
};

const toggleBookRate = (_, { input }, ctx) => {
  return ctx.db.book.toggleRate(input.id, ctx.user.id);
};


module.exports = {
  Query: {
    getBook,
    getBooks,
    getSimilar
  },
  Mutation: {
    addBook,
    editBook,
    toggleBookRate: toggleBookRate
  },
  Book: {
    author(book, _, ctx) {
      return ctx.loaders.author.load(book.author);
    },
    genre(book, _, ctx) {
      return ctx.db.genre.getById(book.genre);
    },
    rated: (book, _, ctx) => {
      if (!ctx.user.isAuthorized)
        return false;

      return ctx.db.book.isRatedByUser(book.id, ctx.user.id);
    },
    rating(book, _, ctx) {
      return ctx.db.user.getList(book.rating);
    }
  }
};