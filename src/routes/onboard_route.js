const express = require('express');
const { register, login } = require('#controllers/onboard_controller');

const router = express.Router({ mergeParams: true });

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
