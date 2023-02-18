class ResponseCode {
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

class ResponseMessage {
  static SUCCESS = 'success';
  static CREATED = 'success';
  static BAD_REQUEST = 'created';
  static FORBIDDEN = 'forbidden';
  static UNAUTHORISED = 'unauthorised';
  static NOT_FOUND = 'not_found';
  static DATA_NOT_FOUND = 'data_not_found';
  static INTERNAL_SERVER_ERROR = 'internal_server_error';

  static DEFAULT = 'default';
  static CONNECT_TIMEOUT = 'connect_timeout';
  static CANCEL = 'cancel';
  static RECEIVE_TIMEOUT = 'receive_timeout';
  static SEND_TIMEOUT = 'send_timeout';
  static CACHE_ERROR = 'cache_error';
  static NO_INTERNET_CONNECTION = 'no_internet_connection';
}

class ResponseStatus {
  static FAILURE = '0000';
  static SUCCESS = '0001';
}

module.exports = {
  ResponseStatus,
  ResponseMessage,
  ResponseCode,
};
