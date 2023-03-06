const asyncCatch = require('#middleware/async_catch');
const UserModel = require('#models/user_model');

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
    .status(ResponseCode.ACCEPTED)
    .defaultResponse(userdata, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});
