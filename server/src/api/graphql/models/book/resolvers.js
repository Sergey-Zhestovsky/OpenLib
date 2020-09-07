const getBook = (_, { input }, ctx) => {
  return ctx.db.book.getById(input.id);
};

const getBooks = (_, { input }, ctx) => {
  const filterField = input.filter && input.filter.filterField;
  const filterValue = input.filter && input.filter.filterValue;

  return ctx.db.book.getList(input.limit, filterField,
    filterValue, input.sort.sortField, input.sort.sortValue);
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
    getBooks
  },
  Mutation: {
    addBook,
    editBook,
    toggleBookRate
  },
  Book: {
    author(book, _, ctx) {
      return ctx.db.author.getById(book.author);
    },
    genre(book, _, ctx) {
      return ctx.db.genre.getById(book.genre);
    },
    rated(book, _, ctx) {
      if (!ctx.user.isAuthorized)
        return false;

      return ctx.db.book.isRatedByUser(book.id, ctx.user.id);
    },
    rating(book, _, ctx) {
      return ctx.db.user.getList(book.rating);
    }
  }
};