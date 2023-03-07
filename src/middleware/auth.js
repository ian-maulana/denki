const jwt = require('jsonwebtoken');
const asyncCatch = require('#middleware/async_catch');
const UserModel = require('#models/user_model');
const ResponseUtil = require('#utils/response_util');
const { ResponseCode, ResponseStatus } = require('#utils/constant');

// Protect routes
exports.protect = asyncCatch(async (req, _res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return next(
      new ResponseUtil(
        'not_authorized',
        ResponseCode.UNAUTHORISED,
        ResponseStatus.FAILURE,
      ),
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ResponseUtil(
        'not_authorized',
        ResponseCode.UNAUTHORISED,
        ResponseStatus.FAILURE,
      ),
    );
  }
});
