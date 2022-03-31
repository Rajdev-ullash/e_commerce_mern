const express = require("express");

const User = require("../model/authModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.avatar,
    });
    await user.save();
    res.status(200).json({
      data: user,
      message: "Registration Successful",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      msg: err.response,
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (user) {
      const checkValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (checkValidPassword) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: token,
          },
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          error_message: "Invalid Information",
        });
      }
    } else {
      res.status(401).json({
        message: "Authentication error",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Authentication Failed",
    });
  }
};
