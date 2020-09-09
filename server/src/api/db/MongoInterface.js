const { Mongoose } = require('mongoose');

class MongoInterface {
  constructor(schemas = () => { }, url, config) {
    this.mongoose = new Mongoose();
    this.connection = null;
    this.url = url;
    this.config = config;
    this.schemas = schemas;

    this.schemas(this.mongoose);
  }

  get ObjectId() {
    return this.mongoose.Types.ObjectId;
  }

  async connect() {
    try {
      this.connection = await this.mongoose.connect(this.url, { ...this.config });

      const { connection, models } = this.mongoose;

      connection.db.stats(async (err, stats) => {
        if (stats.collections === 0)
          await setCollections(models);
      });

      return this.connection;

      async function setCollections(models) {
        if (!models) return null;

        try {
          for (let model in models) {
            await models[model].createCollection();
          }
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async cleanDataBase() {
    await this.mongoose.connection.db.dropDatabase();
    return this;
  }

  async disconnect() {
    return this.mongoose.disconnect();
  }
}

module.exports = MongoInterface;