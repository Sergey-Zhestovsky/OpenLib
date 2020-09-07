const crypto = require('crypto');
const { authorization: config } = require('../../_config');
const { ServerError, serverErrors } = require('../utils/ServerError');
const db = require('../db');

class User {
  constructor({ id = null, publicData = null, session = null } = {}) {
    this.id = id;
    this.public = publicData;
    this.session = session;

    this.synchronize();
  }

  synchronize() {
    this.id = this.session.uid;
  }

  getUser() {
    return {
      id: this.id,
      public: this.public
    };
  }

  get isAuthorized() {
    return !!this.id;
  }

  generateSalt(length = config.salt_length) {
    return crypto.randomBytes(length).toString(config.crypto_display);
  }

  encryptPassword(password, salt) {
    return crypto.createHmac(config.crypto_algorithm, salt)
      .update(password).digest(config.crypto_display);
  }

  verifyPassword(encryptedPassword, password) {
    return encryptedPassword === password;
  }

  async authorize(email, password) {
    const dbUser = await db.actions.user.isExists(email);

    if (!dbUser || !this.verifyPassword(dbUser.password, password))
      throw new ServerError(serverErrors.USER_VERIFICATION__WRONG_DATA);

    await this.session.create(dbUser.id);
    this.synchronize();
    return this;
  }

  async registrate(email, password, { name }) {
    const isExists = await db.actions.user.isExists(email);

    if (isExists)
      throw new ServerError(serverErrors.USER_AUTHORIZATION__EXISTS);

    const salt = this.generateSalt();
    const encryptedPassword = this.encryptPassword(password, salt);
    const dbUser = await db.actions.user.add({
      email, name, password: encryptedPassword, salt
    });

    await this.session.create(dbUser.id);
    this.synchronize();
    return this;
  }

  async exit() {
    await session.remove();
    this.synchronize();
  }
}

module.exports = User;