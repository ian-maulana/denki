const asyncCatch = require('#middleware/async_catch');
const UserModel = require('#models/user_model');

const ResponseUtil = require('#utils/response_util');
const {
  ResponseCode,
  ResponseMessage,
  ResponseStatus,
} = require('#utils/constant');

/**
 * @desc Register user
 * @route POST /api/v1/onboard/register
 * @access public
 */
exports.register = asyncCatch(async (req, res) => {
  const user = await UserModel.create(req.body);
  const { password: _, ...userdata } = user._doc;

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(userdata, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Login
 * @route POST /api/v1/onboard/login
 * @access public
 */
exports.login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ResponseUtil(ResponseMessage.BAD_REQUEST, ResponseCode.BAD_REQUEST),
    );
  }

  // Check if user exist
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new ResponseUtil(ResponseMessage.UNAUTHORISED, ResponseCode.UNAUTHORISED),
    );
  }

  // Check if password match
  const match = await user.matchPassword(password);

  if (!match) {
    return next(
      new ResponseUtil(ResponseMessage.UNAUTHORISED, ResponseCode.UNAUTHORISED),
    );
  }

  // Create token
  const token = await user.getSignedJwtToken();

  const { password: _, ...data } = user._doc;
  const userdata = { ...data, token };

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(userdata, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Get Me
 * @route GET /api/v1/onboard/me
 * @access Private
 */
exports.getMe = asyncCatch(async (req, res) => {
  const user = req.user;

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});
