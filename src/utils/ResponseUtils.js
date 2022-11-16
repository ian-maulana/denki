class ResponseUtils extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @desc Generate default response
   * @param  {{status: string, data: string | null, message: string}} Response response
   */

  static defaultResponse({
    status = '0000',
    data = null,
    message = 'Success',
  } = {}) {
    return { status, data, message };
  }

  /**
   * @desc Generate error response
   * @param  {{status: string, data: string | null, message: string}} Response response default
   */

  static errorResponse({
    status = '5000',
    data = null,
    message = 'Something went wrong',
  } = {}) {
    return { status, data, message: this?.message || message };
  }
}

module.exports = ResponseUtils;
