module.exports = {
  User: require('./User'),
  session: {
    SessionManager: require('./session/manager'),
    sessionStorage: require('./session/storage')
  }
};