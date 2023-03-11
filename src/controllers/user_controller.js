const asyncCatch = require('#middleware/async_catch');
const ResponseUtil = require('#utils/response_util');
const UserModel = require('#models/user_model');
const {
  ResponseCode,
  ResponseStatus,
  ResponseMessage,
} = require('#utils/constant');

/**
 * @desc Fetch all users
 * @route GET /api/v1/user
 * @access Private
 */
exports.getUsers = asyncCatch(async (_req, res) => {
  res.status(ResponseCode.SUCCESS).json(res.advancedResult);
});

/**
 * @desc Fetch user by id
 * @route GET /api/v1/user/:id
 * @access Private
 */
exports.getUser = asyncCatch(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(
      new ResponseUtil(
        ResponseMessage.DATA_NOT_FOUND,
        ResponseCode.NOT_FOUND,
        ResponseStatus.FAILURE,
      ),
    );
  }

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Create new user
 * @route POST /api/v1/user
 * @access Private
 */
exports.createUser = asyncCatch(async (req, res) => {
  const user = await UserModel.create(req.body);
  delete user._doc.password;

  res
    .status(ResponseCode.CREATED)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Update user by id
 * @route PUT /api/v1/user/:id
 * @access Private
 */
exports.updateUser = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const payload = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Change Password
 * @route PUT /api/v1/user/change-password
 * @access Private
 */
exports.changePassword = asyncCatch(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(
      new ResponseUtil(
        ResponseMessage.UNAUTHORISED,
        ResponseCode.UNAUTHORISED,
        ResponseStatus.FAILURE,
      ),
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  delete user._doc.password;

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Delete user by id
 * @route DELETE /api/v1/user/:id
 * @access Private
 */
exports.deleteUser = asyncCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserModel.findByIdAndRemove(id);

  if (!user) {
    return next(
      new ResponseUtil(
        ResponseMessage.DATA_NOT_FOUND,
        ResponseCode.NOT_FOUND,
        ResponseStatus.FAILURE,
      ),
    );
  }

  res
    .status(ResponseCode.ACCEPTED)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});
