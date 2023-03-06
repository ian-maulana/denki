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

  res
    .status(ResponseCode.ACCEPTED)
    .defaultResponse(user, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});
