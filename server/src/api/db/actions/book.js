const { Types } = require('mongoose');
const mongoose = require('../mongoose').mongoose;;
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

async function getAuthorBooks(authorId) {
  try {
    return await Book.find({ author: authorId })
      .exec();
  } catch (error) {
    throw ServerError.customError("getAuthorsBooks_book", error);
  }
}

async function getList({ limit = 0, offset = 0, authorIds = [], genreIds = [],
  sortField = "date", sortValue = -1, search = "" } = {}) {
  try {
    let books = Book.find();

    if (authorIds.length)
      books = books.find({ author: { $in: authorIds } });

    if (genreIds.length)
      books = books.find({ genre: { $in: genreIds } });

    if (search.length)
      books = books.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ]
      });

    return await books
      .sort({ [sortField]: sortValue })
      .skip(offset)
      .limit(limit)
      .exec();
  } catch (error) {
    throw ServerError.customError("getList_book", error);
  }
}

async function findSimilar(id, limit = 1, userId) {
  try {
    const book = await getById(id);
    return await Book.aggregate([{
      $match: {
        genre: book.genre,
        _id: { $not: { $eq: book.id } },
        rating: { $not: { $eq: ObjectId(userId) } }
      }
    }, {
      $sample: { size: limit }
    }]);
  } catch (error) {
    throw ServerError.customError("add_book", error);
  }
}

async function getUserRatedBooks(userId, limit = 0) {
  try {
    return await Book.find({ rating: userId })
      .limit(limit)
      .exec();
  } catch (error) {
    throw ServerError.customError("getUserRatedBooks_book", error);
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
  getAuthorBooks,
  getList,
  findSimilar,
  getUserRatedBooks,
  add,
  edit,
  getUserRate,
  isRatedByUser,
  toggleRate
};