const ResponseUtil = require('#utils/response_util');
const { ApiCode, ApiMessage } = require('#utils/constant');

const errorParser = (err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.log(err.message.red);
  let message = ApiMessage.DEFAULT;

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    err = new ResponseUtil(message, ApiCode.NOT_FOUND);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    err = new ResponseUtil(message, ApiCode.BAD_REQUEST);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message);
    err = new ResponseUtil(message, ApiCode.BAD_REQUEST);
  }

  res
    .status(err.statusCode ?? ApiCode.INTERNAL_SERVER_ERROR)
    .json(ResponseUtil.create(err.message ?? message, null, err.responseCode));
};

module.exports = errorParser;
