/**
 * Async Catch Handler
 * @param {Function} fn
 * @returns
 */
const asyncCatch = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncCatch;
