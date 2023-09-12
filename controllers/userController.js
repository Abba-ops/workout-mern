const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const genToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = genToken(user._id);
    return res.status(200).json({ token, email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = genToken(user._id);
    return res.status(200).json({ token, email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postLogin,
  postSignup,
};
