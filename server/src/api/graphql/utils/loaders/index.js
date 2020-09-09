const DataLoader = require('dataloader');
const _ = require('lodash');

const createAuthorLoader = (dbActions) => {
  return new DataLoader(authorIds => {
    return dbActions.author.getByIds(authorIds)
      .then(authors => {
        const authorsById = _.keyBy(authors, '_id');
        return authorIds.map(authorId => authorsById[authorId]);
      });
  })
};

const createUserLoader = (dbActions) => {
  return new DataLoader(userIds => {
    return dbActions.user.getList(userIds)
      .then(users => {
        const usersById = _.keyBy(users, '_id');
        return userIds.map(userId => usersById[userId]);
      });
  })
};

const createAuthorBooksLoader = (dbActions) => {
  return new DataLoader(async authorIds => {
    return Promise.all(
      authorIds.map(authorId => {
        return dbActions.book.getAuthorBooks(authorId);
      })
    );
  })
};


module.exports = (...args) => {
  return {
    author: createAuthorLoader(...args),
    user: createUserLoader(...args),
    authorBooks: createAuthorBooksLoader(...args),
  };
};