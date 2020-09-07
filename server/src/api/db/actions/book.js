const { Types } = require('mongoose');
const mongoose = require('../mongoose');
const { ServerError, serverErrors } = require('../../utils/ServerError');

const ObjectId = Types.ObjectId;
const { Book } = mongoose.models;

async function getById(id) {
  try {
    return await Book.findById(id)
      .exec();
  } catch (error) {
    throw ServerError.customError("getById_book", error);
  }
}

async function getList(limit, filterField, filterValue, sortField, sortValue) {
  try {
    return await Book.find({ [filterField]: filterValue })
      .sort({ [sortField]: sortValue })
      .limit(limit)
      .exec();
  } catch (error) {
    throw ServerError.customError("getList_book", error);
  }
}

async function add(data) {
  try {
    const book = new Book(data);
    return await book.save();
  } catch (error) {
    throw ServerError.customError("add_book", error);
  }
}

async function edit(id, data) {
  try {
    return await Book.findByIdAndUpdate(id, data, { new: true }).exec();
  } catch (error) {
    throw ServerError.customError("edit_book", error);
  }
}

async function getUserRate(id, userId) {
  try {
    return await Book.findOne({
      _id: id,
      rating: { $in: ObjectId(userId) }
    }).exec();
  } catch (error) {
    throw ServerError.customError("getUserRate_book", error);
  }
}

async function isRatedByUser(id, userId) {
  try {
    return !!(await getUserRate(id, userId));
  } catch (error) {
    throw ServerError.customError("isRatedByUser_book", error);
  }
}

async function toggleRate(id, userId) {
  try {
    const isRated = await isRatedByUser(id, userId);

    if (isRated)
      return await Book.findByIdAndUpdate(id, {
        $pull: { rating: userId }
      }, { new: true }).exec();

    return await Book.findByIdAndUpdate(id, {
      $push: { rating: userId }
    }, { new: true }).exec();
  } catch (error) {
    throw ServerError.customError("toggleRate_book", error);
  }
}

module.exports = {
  getById,
  getList,
  add,
  edit,
  getUserRate,
  isRatedByUser,
  toggleRate
};