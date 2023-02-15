class ApiCode {
  static SUCCESS = 200;
  static CREATED = 201;
  static ACCEPTED = 202;
  static BAD_REQUEST = 400;
  static FORBIDDEN = 403;
  static UNAUTHORISED = 401;
  static NOT_FOUND = 404;
  static INTERNAL_SERVER_ERROR = 500;
  static DEFAULT = -1;
  static CONNECT_TIMEOUT = -2;
  static CANCEL = -3;
  static RECEIVE_TIMEOUT = -4;
  static SEND_TIMEOUT = -5;
  static CACHE_ERROR = -6;
  static NO_INTERNET_CONNECTION = -7;
}

class ApiMessage {
  static SUCCESS = 'Success';
  static CREATED = 'Success with no content';
  static BAD_REQUEST = 'Bad request, try again later';
  static FORBIDDEN = 'Forbidden request, try again later';
  static UNAUTHORISED = 'User is unauthorised, try again later';
  static NOT_FOUND = 'URL is not found, try again later';
  static DATA_NOT_FOUND = 'Data not found!';
  static INTERNAL_SERVER_ERROR = 'Something wrong, try again later';

  static DEFAULT = 'Something wrong, try again later';
  static CONNECT_TIMEOUT = 'Connection timeout, try again later';
  static CANCEL = 'Request was cancelled, try again later';
  static RECEIVE_TIMEOUT = 'Time out error, try again later';
  static SEND_TIMEOUT = 'Time out error, try again later';
  static CACHE_ERROR = 'Cache error, try again later';
  static NO_INTERNET_CONNECTION = 'Please check your internet connection';
}

class ApiStatus {
  static FAILURE = '0000';
  static SUCCESS = '0001';
}

module.exports = {
  ApiStatus,
  ApiMessage,
  ApiCode,
};
