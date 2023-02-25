const asyncCatch = require('#middleware/async_catch');

const UserModel = require('#models/user_model');
const ResponseUtil = require('#utils/response_util');
const {
  ResponseCode,
  ResponseStatus,
  ResponseMessage,
} = require('#utils/constant');

const { SUCCESS: successCode } = ResponseStatus;
const { SUCCESS: successMessage } = ResponseMessage;

/**
 * @desc Fetch all users
 * @route GET /api/v1/user
 * @access Private
 */
exports.getUsers = asyncCatch(async (req, res) => {
  const users = await UserModel.findById(req.params.id);

  res
    .status(ResponseCode.SUCCESS)
    .json(ResponseUtil.parse(successCode, users, req.t(successMessage)));
});

/**
 * @desc Fetch user by id
 * @route GET /api/v1/user/:id
 * @access Private
 */
exports.getUser = asyncCatch(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  res
    .status(ResponseCode.SUCCESS)
    .json(ResponseUtil.parse(successCode, user, req.t(successMessage)));
});

/**
 * @desc Create new user
 * @route POST /api/v1/user
 * @access Private
 */
exports.createUser = asyncCatch(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res
    .status(ResponseCode.CREATED)
    .json(ResponseUtil.parse(successCode, user, req.t(successMessage)));
});

/**
 * @desc Update user by id
 * @route PUT /api/v1/user/:id
 * @access Private
 */
exports.updateUser = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const body = { name, email };
  const user = await UserModel.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  res
    .status(ResponseCode.SUCCESS)
    .json(ResponseUtil.parse(successCode, user, req.t(successMessage)));
});

/**
 * @desc Delete user by id
 * @route DELETE /api/v1/users/:id
 * @access Private
 */
exports.deleteUser = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findByIdAndRemove(id);

  res
    .status(ResponseCode.ACCEPTED)
    .json(ResponseUtil.parse(successCode, user, req.t(successMessage)));
});
