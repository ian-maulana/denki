const { ResponseStatus } = require('./constant');

class ResponseUtil extends Error {
  /**
   * @desc Response utils constructor
   * @param {string} message Response message
   * @param {string} [responseCode = ResponseStatus.FAILURE] Custom status code in body
   * @param {number} statusCode Response status code in headers
   */
  constructor(message, statusCode, responseCode = ResponseStatus.FAILURE) {
    super(message);
    this.statusCode = statusCode;
    this.responseCode = responseCode;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @desc Generate default response
   * @param {string} message Response message
   * @param {any} data Response data
   * @param {string} status Response status code
   */
  static parse(status, data, message) {
    return {
      status: status,
      data: data ?? null,
      message: message,
    };
  }
}

module.exports = ResponseUtil;
