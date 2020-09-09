const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');
const { ServerError, serverErrors } = require('../../../utils/ServerError');

class AuthorizedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, type) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (root, args, ctx, info) {
      if (!ctx.user.isAuthorized)
        throw new ServerError(serverErrors.USER__NOT_AUTHORIZED);

      return resolve.call(this, root, args, ctx, info);
    }
  }
}

module.exports = {
  authorized: AuthorizedDirective
};