const express = require('express');
const { protect } = require('#middleware/auth');
const { register, login, getMe } = require('#controllers/onboard_controller');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);

module.exports = router;
