const express = require('express');
const { register } = require('#controllers/onboard_controller');

const router = express.Router({ mergeParams: true });

router.route('/register').post(register);

module.exports = router;
