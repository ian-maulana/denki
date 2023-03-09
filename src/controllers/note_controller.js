const { ResponseCode } = require('#utils/constant');

/**
 * @desc Fetch all notes
 * @route GET /api/v1/notes
 * @acces Private
 */
exports.getNotes = (req, res) => {
  return res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: req.t('success') });
};

/**
 * @desc Fetch note by id
 * @route GET /api/v1/notes/:id
 * @acces Private
 */
exports.getNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: req.t('success') });
};

/**
 * @desc Create new note
 * @route POST /api/v1/notes
 * @acces Private
 */
exports.createNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: req.t('success') });
};

/**
 * @desc Update note by id
 * @route PUT /api/v1/notes/:id
 * @acces Private
 */
exports.updateNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: req.t('success') });
};

/**
 * @desc Delete note by id
 * @route DELETE /api/v1/notes/:id
 * @acces Private
 */
exports.deleteNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: req.t('success') });
};
