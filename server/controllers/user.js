const User = require("../models/user");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Zadejte e-mail a heslo." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Špatně zadaný email nebo heslo." });
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
      return res.status(400).send({ message: "Všechna pole jsou povinná!" });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .send({ message: "Tento email je již zaregistrován." });

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
        return res.status(404).json({ message: "Uživatel nenalezen" });
      }
  
      res.status(200).send({
        message: "User found",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({ erorr: err.message });
    }
  };
  