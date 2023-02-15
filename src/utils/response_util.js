const { ApiStatus } = require('./constant');

class ResponseUtil extends Error {
  constructor(message, statusCode, responseCode = ApiStatus.FAILURE) {
    super(message);
    this.statusCode = statusCode;
    this.responseCode = responseCode;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @desc Generate default response
   * @param string message Response message
   * @param any data Response data
   * @param string status Response status code
   */

  static create(message = 'Success', data = null, status = this.responseCode) {
    return { status, data, message };
  }
}

module.exports = ResponseUtil;
