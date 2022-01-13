const httpStatus = require('http-status-codes');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'User Already Exist',
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password,
    });
    newUser
      .save()
      .then((doc) => {
        res.status(httpStatus.StatusCodes.CREATED).json({
          message: 'User created Successfully',
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'Registration Failed',
        });
      });
  } catch (error) {
    res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Registration Failed',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user)
      return res.status(400).json({
        message: 'User Doesnot Exist',
      });

    // check for password correctness
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //password match condition
    if (!validPassword)
      return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
        message: 'Wrong Password',
      });

    const payload = {
      email: user.email,
      userId: user._id,
    };
    const options = { expiresIn: '1h', issuer: 'http://localhost:3000' };
    const token = jwt.sign(payload, 'secret', options);
    res.status(httpStatus.StatusCodes.OK).json({
      expiresIn: 3600,
      message: 'Login successful',
      token: token,
      data: user.email,
    });
  } catch (error) {
    res
      .status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
