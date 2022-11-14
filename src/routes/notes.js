const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all notes' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Show note by ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new note' });
});

router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update note with ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete note with ${req.params.id}` });
});

module.exports = router;
