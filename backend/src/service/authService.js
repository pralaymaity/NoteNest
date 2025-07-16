const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authUser");

exports.signup = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existUser = await User.findOne({ where: { email } });
  
  if (existUser) {
    throw new Error("Email already taken");
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashpassword,
  });

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

exports.signin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return token;
  } else {
    throw new Error("Invalid credentials");
  }
};
