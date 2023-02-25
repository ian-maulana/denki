const ResponseUtil = require('#utils/response_util');
const { ResponseCode, ResponseMessage } = require('#utils/constant');

const errorResponse = (err, req, res, _next) => {
  // eslint-disable-next-line no-console
  console.log(err.message.red);

  // Define default message
  let message = ResponseMessage.DEFAULT;
  let statusCode = err.statusCode ?? ResponseCode.INTERNAL_SERVER_ERROR;

  // Error not found
  if (err.name === 'CastError') {
    message = ResponseMessage.DATA_NOT_FOUND;
    statusCode = ResponseCode.NOT_FOUND;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = ResponseMessage.DUPLICATE_ENTRY;
    statusCode = ResponseCode.BAD_REQUEST;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message);
    statusCode = ResponseCode.BAD_REQUEST;
  }

  err = new ResponseUtil(message, ResponseCode.BAD_REQUEST);
  res
    .status(statusCode)
    .json(ResponseUtil.parse(err.responseCode, null, req.t(err.message)));
};

module.exports = errorResponse;
