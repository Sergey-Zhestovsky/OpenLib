const { Types } = require('mongoose');
const mongoose = require('../mongoose');
const { ServerError, serverErrors } = require('../../utils/ServerError');

const ObjectId = Types.ObjectId;
const { Author } = mongoose.models;

async function getById(id) {
  try {
    return await Author.findById(id)
      .exec();
  } catch (error) {
    throw ServerError.customError("getById_author", error);
  }
}

async function getPublicById(id) {
  try {
    return await Author.findById(id)
      .populate()
      .exec();
  } catch (error) {
    throw ServerError.customError("getPublicById_author", error);
  }
}

async function add(data) {
  try {
    console.log(data)
    const author = new Author(data);
    return await author.save();
  } catch (error) {
    console.log(error)
    throw ServerError.customError("add_author", error);
  }
}

async function edit(id, data) {
  try {
    return await Author.findByIdAndUpdate(id, data);
  } catch (error) {
    throw ServerError.customError("edit_author", error);
  }
}

async function editGenres(id, genres) {
  try {
    return await Author.findByIdAndUpdate(id, { topGenres: genres });
  } catch (error) {
    throw ServerError.customError("editGenres_author", error);
  }
}

module.exports = {
  getById,
  getPublicById,
  add,
  edit,
  editGenres
};