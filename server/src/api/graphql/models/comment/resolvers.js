const getComment = (_, { input }, ctx) => {
  return ctx.db.comment.getById(input.id);
};

const getComments = (_, { input }, ctx) => {
  return ctx.db.comment.getList(input.subjectType, input.subjectId);
};

const addComment = (_, { input }, ctx) => {
  return ctx.db.comment.add({ ...input, user: ctx.user.id });
};

const toggleCommentRate = (_, { input }, ctx) => {
  return ctx.db.comment.toggleRate(input.id, ctx.user.id);
};

const removeComment = (_, { input }, ctx) => {
  return ctx.db.comment.remove(input.id, ctx.user.id);
};

module.exports = {
  Query: {
    getComment,
    getComments
  },
  Mutation: {
    addComment: addComment,
    toggleCommentRate: toggleCommentRate,
    removeComment: removeComment,
  },
  Comment: {
    user(comment, _, ctx) {
      return ctx.loaders.user.load(comment.user);
    },
    rated(comment, _, ctx) {
      if (!ctx.user.isAuthorized) return false;
      return ctx.db.comment.isRatedByUser(comment.id, ctx.user.id);
    },
    rating(comment, _, ctx) {
      return ctx.db.user.getList(comment.rating);
    }
  }
};