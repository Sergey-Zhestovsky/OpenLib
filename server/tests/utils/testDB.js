const { MongoInterface, connections: { OpenLibDB } } = require('../../src/api/db');
const { test: { db } } = require('../../src/_config');

const testDB = new MongoInterface(OpenLibDB.interface.schemas,
  db.url, db.options);

module.exports = testDB;