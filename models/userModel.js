const { Schema, model } = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled in");
  }
  if (!isEmail(email)) {
    throw new Error("Email must be a valid email");
  }
  if (!isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already exists");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await this.create({ password: hash, email });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled in");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid password or email");
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    throw new Error("Invalid password or email");
  }
  return user;
};

module.exports = model("User", userSchema);
