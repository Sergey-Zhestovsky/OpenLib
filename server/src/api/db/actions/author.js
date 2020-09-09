const { Types } = require('mongoose');
const mongoose = require('../mongoose').mongoose;
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

async function getByIds(ids) {
  try {
    return await Author.find({ _id: { $in: ids } })
      .exec();
  } catch (error) {
    throw ServerError.customError("getByIds_author", error);
  }
}

async function getList(limit = 0, offset = 0, search = "") {
  try {
    return await Author.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    })
      .skip(offset)
      .limit(limit)
      .exec();
  } catch (error) {
    throw ServerError.customError("getList_author", error);
  }
}

async function add(data) {
  try {
    const author = new Author(data);
    return await author.save();
  } catch (error) {
    throw ServerError.customError("add_author", error);
  }
}

async function edit(id, data) {
  try {
    return await Author.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw ServerError.customError("edit_author", error);
  }
}

async function editGenres(id, genres) {
  try {
    return await Author.findByIdAndUpdate(id, { topGenres: genres }, { new: true });
  } catch (error) {
    throw ServerError.customError("editGenres_author", error);
  }
}

module.exports = {
  getById,
  getByIds,
  getList,
  add,
  edit,
  editGenres
};