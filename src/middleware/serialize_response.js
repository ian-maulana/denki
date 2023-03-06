const serializeResponse = async (req, res, next) => {
  /**
   * Default Serialize Response
   * @param {any} data
   * @param {string} status
   * @param {string} message
   */
  res.defaultResponse = function (data, status, message) {
    res.json.call(this, { data, status, message: req.t(message) });
  };

  next();
};

module.exports = serializeResponse;
