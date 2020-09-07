const { Types } = require('mongoose');
const mongoose = require('../mongoose');
const { ServerError, serverErrors } = require('../../utils/ServerError');

const ObjectId = Types.ObjectId;
const { User } = mongoose.models;

async function getById(id) {
  try {
    return await User.findById(id)
      .exec();
  } catch (error) {
    throw ServerError.customError("getById_user", error);
  }
}

async function getList(ids) {
  try {
    return await User.find({
      _id: { $in: ids }
    })
      .exec();
  } catch (error) {
    throw ServerError.customError("getList_user", error);
  }
}

async function add(data) {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    throw ServerError.customError("add_user", error);
  }
}

async function verify(email, password) {
  try {
    const user = await User.find({ email });

    if (!user || !user.checkPassword(password))
      throw new ServerError(serverErrors.USER_VERIFICATION__WRONG_DATA);

    return user;
  } catch (error) {
    throw ServerError.customError("verify_user", error);
  }
}

module.exports = {
  getById,
  getList,
  add,
  verify
};