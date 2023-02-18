const asyncCatch = require('#middleware/async_catch');

const UserModel = require('#models/user_model');
const ResponseUtil = require('#utils/response_util');
const { ResponseCode, ResponseStatus } = require('#utils/constant');

/**
 * @desc Fetch all users
 * @route GET /api/v1/users
 * @access Private
 */
exports.getUsers = asyncCatch(async (_req, res) => {
  const users = await UserModel.find();
  res
    .status(ResponseCode.SUCCESS)
    .json(ResponseUtil.parse(ResponseStatus.SUCCESS, users));
});

/**
 * @desc Fetch user by id
 * @route GET /api/v1/users/:id
 * @access Private
 */
exports.getUser = asyncCatch(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  res
    .status(ResponseCode.SUCCESS)
    .json(ResponseUtil.parseResponseStatus.SUCCESS(user));
});

/**
 * @desc Create new user
 * @route POST /api/v1/users
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
    .json(ResponseUtil.parse(ResponseStatus.SUCCESS, user));
});

/**
 * @desc Update user by id
 * @route PUT /api/v1/users/:id
 * @access Private
 */
exports.updateUser = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const newUser = {
    name: name,
    email: email,
  };

  const user = await UserModel.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  });

  res
    .status(ResponseCode.SUCCESS)
    .json(ResponseUtil.parse(ResponseStatus.SUCCESS, user));
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
    .json(ResponseUtil.parse(ResponseStatus.SUCCESS, user));
});
