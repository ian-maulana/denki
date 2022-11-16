const userModel = require('../models/User');
const { defaultResponse, errorResponse } = require('../utils/ResponseUtils');

/**
 * @desc Fetch all users
 * @route GET /api/v1/users
 * @access Private
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(defaultResponse({ data: users }));
  } catch (error) {
    res.status(500).json(errorResponse());
  }
};

/**
 * @desc Fetch user by id
 * @route GET /api/v1/users/:id
 * @access Private
 */
exports.getUser = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.params.id });
    res.status(200).json(defaultResponse({ data: user }));
  } catch (error) {
    res.status(500).json(errorResponse());
  }
};

/**
 * @desc Create new user
 * @route POST /api/v1/users
 * @access Private
 */
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json(
          errorResponse({ status: '5001', message: 'User already exists' }),
        );
    }

    const result = await userModel.create({
      email: email,
      password: password,
      name: name,
    });

    res.status(201).json(defaultResponse({ data: result }));
  } catch (error) {
    res.status(500).json(errorResponse());
  }
};

/**
 * @desc Update user by id
 * @route PUT /api/v1/users/:id
 * @access Private
 */
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const newUser = {
    name: name,
    email: email,
  };

  try {
    const user = await userModel.findByIdAndUpdate(id, newUser, { new: true });
    res.status(200).json(defaultResponse({ data: user }));
  } catch (error) {
    res.status(500).json(errorResponse());
  }
};

/**
 * @desc Delete user by id
 * @route DELETE /api/v1/users/:id
 * @access Private
 */
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findByIdAndRemove(id);
    res.status(202).json(defaultResponse({ data: user }));
  } catch (error) {
    res.status(500).json(errorResponse());
  }
};
