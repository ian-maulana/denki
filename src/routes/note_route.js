const express = require('express');
const advancedResult = require('#middleware/advanced_result');
const { protect } = require('#middleware/auth');

const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require('#controllers/note_controller');

const router = express.Router();

const NoteModel = require('#models/note_model');

router.use(protect);
router
  .route('/')
  .get(advancedResult(NoteModel, 'user'), getNotes)
  .post(createNote);
router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;
