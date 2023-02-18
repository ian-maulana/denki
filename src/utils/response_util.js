const { ResponseStatus } = require('./constant');

class ResponseUtil extends Error {
  constructor(message, statusCode, responseCode = ResponseStatus.FAILURE) {
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

  static parse(status, data, message) {
    return {
      status: status ?? this.statusCode,
      data: data ?? null,
      message: message ?? this.message,
    };
  }
}

module.exports = ResponseUtil;
