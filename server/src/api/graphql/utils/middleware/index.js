const { ServerError, serverErrors } = require('../../../utils/ServerError');

const authorized = (next) => {
  return (root, args, ctx, info) => {
    if (!ctx.user.isAuthorized)
      throw new ServerError(serverErrors.USER__NOT_AUTHORIZED);

    return next(root, args, ctx, info);
  };
};

module.exports = {
  authorized
};