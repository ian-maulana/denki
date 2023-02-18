const ResponseUtil = require('#utils/response_util');
const { ResponseCode, ResponseMessage } = require('#utils/constant');

const errorParser = (err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.log(err.message.red);
  let message = ResponseMessage.DEFAULT;

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    err = new ResponseUtil(message, ResponseCode.NOT_FOUND);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    err = new ResponseUtil(message, ResponseCode.BAD_REQUEST);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message);
    err = new ResponseUtil(message, ResponseCode.BAD_REQUEST);
  }

  res
    .status(err.statusCode ?? ResponseCode.INTERNAL_SERVER_ERROR)
    .json(ResponseUtil.parse(err.responseCode, null, err.message ?? message));
};

module.exports = errorParser;
