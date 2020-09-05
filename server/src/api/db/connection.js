module.exports = function (mongooseInstance, url, options) {
  const connection = mongooseInstance.connect(url, { ...options });

  connection.then(({ connection, models }) => {
    connection.db.stats(async (err, stats) => {
      if (stats.collections === 0)
        await setCollections(models);
    });
  });

  connection.catch(error => {
    console.error(error);
  });

  async function setCollections(models) {
    if (!models)
      return null;

    try {
      for (let model in models) {
        await models[model].createCollection();
      }
    } catch (error) {
      throw error;
    }
  }

  return connection;
}