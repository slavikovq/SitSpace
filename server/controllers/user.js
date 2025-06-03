const User = require("../models/user");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Enter your email and password." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Wrong email or password." });
    }

    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password))
      return res.status(400).send({ message: "All fields are required!" });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .send({ message: "This email is already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.status(201).json({ token, user: { first_name, last_name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({
      message: "User found",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).send({
      message: "User found",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({email: req.params.email});

    if (!user) return res.status(404).json({ message: "User with this email does not exist" });

    res.status(200).send({
      message: "User found",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No users found!" });
    }

    const totalUsers = users.length;

    res.status(200).json({
      message: "User statistics fetched successfully!",
      payload: totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let profilePicture = user.profilePicture;
    let cloudinaryId = user.cloudinaryId;
    
    if (req.body.removeProfilePicture === "true") {
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
        profilePicture = null;
        cloudinaryId = null;
      }
    } else {
      if (req.file) {
        if (user.cloudinaryId) {
          await cloudinary.uploader.destroy(user.cloudinaryId);
        }

        const buffer = req.file.buffer;
        const base64 = buffer.toString("base64");
        const dataUri = "data:" + req.file.mimetype + ";base64," + base64;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "profile_pictures",
        });
        profilePicture = result.secure_url;
        cloudinaryId = result.public_id;
      }
    }

    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.profilePicture = profilePicture;
    user.cloudinaryId = cloudinaryId;

    await user.save();

    res.status(200).json({
      message: "User updated",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Wrong password." });

    res.status(200).json({ message: "Password is correct." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};