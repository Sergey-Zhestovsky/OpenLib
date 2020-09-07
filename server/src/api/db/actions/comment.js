const { Types } = require('mongoose');
const mongoose = require('../mongoose');
const { ServerError, serverErrors } = require('../../utils/ServerError');

const ObjectId = Types.ObjectId;
const { Comment } = mongoose.models;

async function getById(id) {
  try {
    return await Comment.findById(id)
      .exec();
  } catch (error) {
    throw ServerError.customError("getById_comment", error);
  }
}

async function getList(subjectType, subjectId) {
  try {
    return await Comment.find({
      onModel: subjectType,
      subject: subjectId
    })
      .exec();
  } catch (error) {
    throw ServerError.customError("getList_comment", error);
  }
}

async function add(data) {
  try {
    const comment = new Comment(data);
    return await comment.save();
  } catch (error) {
    throw ServerError.customError("add_comment", error);
  }
}

async function remove(id, userId) {
  try {
    return await Comment.findOneAndRemove({
      _id: id,
      user: userId
    }).exec();
  } catch (error) {
    throw ServerError.customError("edit_comment", error);
  }
}

async function getUserRate(id, userId) {
  try {
    return await Comment.findOne({
      _id: id,
      rating: { $in: ObjectId(userId) }
    }).exec();
  } catch (error) {
    throw ServerError.customError("getUserRate_comment", error);
  }
}

async function isRatedByUser(id, userId) {
  try {
    return !!(await getUserRate(id, userId));
  } catch (error) {
    throw ServerError.customError("isRatedByUser_comment", error);
  }
}

async function toggleRate(id, userId) {
  try {
    const isRated = await isRatedByUser(id, userId);

    if (isRated)
      return await Comment.findByIdAndUpdate(id, {
        $pull: { rating: userId }
      }, { new: true }).exec();

    return await Comment.findByIdAndUpdate(id, {
      $push: { rating: userId }
    }, { new: true }).exec();
  } catch (error) {
    throw ServerError.customError("toggleRate_comment", error);
  }
}

module.exports = {
  getById,
  getList,
  add,
  remove,
  getUserRate,
  isRatedByUser,
  toggleRate
};