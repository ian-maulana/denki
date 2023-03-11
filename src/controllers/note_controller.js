const asyncCatch = require('#middleware/async_catch');
const ResponseUtil = require('#utils/response_util');
const NoteModel = require('#models/note_model');
const {
  ResponseCode,
  ResponseStatus,
  ResponseMessage,
} = require('#utils/constant');

/**
 * @desc Fetch all notes
 * @route GET /api/v1/notes
 * @acces Private
 */
exports.getNotes = asyncCatch(async (_req, res) => {
  return res.status(ResponseCode.SUCCESS).json(res.advancedResult);
});

/**
 * @desc Fetch note by id
 * @route GET /api/v1/notes/:id
 * @acces Private
 */
exports.getNote = asyncCatch(async (req, res, next) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    return next(
      new ResponseUtil(
        ResponseMessage.DATA_NOT_FOUND,
        ResponseCode.NOT_FOUND,
        ResponseStatus.FAILURE,
      ),
    );
  }

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(note, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Create new note
 * @route POST /api/v1/notes
 * @acces Private
 */
exports.createNote = asyncCatch(async (req, res, next) => {
  req.body.user = req.user.id;

  if (!req.body.user) {
    return next(
      new ResponseUtil(
        ResponseMessage.UNAUTHORISED,
        ResponseCode.UNAUTHORISED,
        ResponseStatus.FAILURE,
      ),
    );
  }

  if (req.body.user) {
    return next(
      new ResponseUtil(
        ResponseMessage.UNAUTHORISED,
        ResponseCode.UNAUTHORISED,
        ResponseStatus.FAILURE,
      ),
    );
  }

  const note = await NoteModel.create(req.body);

  res
    .status(ResponseCode.CREATED)
    .defaultResponse(note, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Update note by id
 * @route PUT /api/v1/notes/:id
 * @acces Private
 */
exports.updateNote = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(note, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});

/**
 * @desc Delete note by id
 * @route DELETE /api/v1/notes/:id
 * @acces Private
 */
exports.deleteNote = asyncCatch(async (req, res, next) => {
  const id = req.params.id;
  const note = await NoteModel.findByIdAndRemove(id);

  if (!note) {
    return next(
      new ResponseUtil(
        ResponseMessage.DATA_NOT_FOUND,
        ResponseCode.NOT_FOUND,
        ResponseStatus.FAILURE,
      ),
    );
  }

  res
    .status(ResponseCode.SUCCESS)
    .defaultResponse(note, ResponseStatus.SUCCESS, ResponseMessage.SUCCESS);
});
