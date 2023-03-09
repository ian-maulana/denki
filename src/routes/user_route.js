const express = require('express');
const advancedResult = require('#middleware/advanced_result');
const { protect } = require('#middleware/auth');

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('#controllers/user_controller');

const router = express.Router({ mergeParams: true });

const UserModel = require('#models/user_model');

router.use(protect);
router.route('/').get(advancedResult(UserModel), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
