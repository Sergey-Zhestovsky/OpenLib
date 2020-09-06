const { Types } = require('mongoose');
const mongoose = require('../mongoose');
const { ServerError, serverErrors } = require('../../utils/ServerError');

const ObjectId = Types.ObjectId;
const { Genre } = mongoose.models;

async function getById(id) {
  try {
    return await Genre.findById(id)
      .exec();
  } catch (error) {
    throw ServerError.customError("getById_genre", error);
  }
}

async function getGenresByIds(ids) {
  try {
    return await Genre.find({ _id: { $in: ids } })
      .exec();
  } catch (error) {
    throw ServerError.customError("getGenresByIds_genre", error);
  }
}

async function add(data) {
  try {
    const genre = new Genre(data);
    return await genre.save();
  } catch (error) {
    throw ServerError.customError("add_genre", error);
  }
}

module.exports = {
  getById,
  getGenresByIds,
  add
};