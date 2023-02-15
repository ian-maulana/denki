const { ApiCode: ResponseCode } = require('#utils/constant');

/**
 * @desc Fetch all notes
 * @route GET /api/v1/notes
 * @acces Private
 */
exports.getNotes = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: 'Show all notes' });
};

/**
 * @desc Fetch note by id
 * @route GET /api/v1/notes/:id
 * @acces Private
 */
exports.getNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: `Show note with ${req.params.id}` });
};

/**
 * @desc Create new note
 * @route POST /api/v1/notes
 * @acces Private
 */
exports.createNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: 'Create new note' });
};

/**
 * @desc Update note by id
 * @route PUT /api/v1/notes/:id
 * @acces Private
 */
exports.updateNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: `Update note with ${req.params.id}` });
};

/**
 * @desc Delete note by id
 * @route DELETE /api/v1/notes/:id
 * @acces Private
 */
exports.deleteNote = (req, res) => {
  res
    .status(ResponseCode.SUCCESS)
    .json({ success: true, msg: `Delete note with ${req.params.id}` });
};
