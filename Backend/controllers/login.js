const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const UserType = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserType.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user) {
    return res.status(404).json({
      error: "user not found",
    });
  }

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid email or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    email: user.email,
    name: user.name,
    id: user._id,
    style: user.style,
  });
});

module.exports = loginRouter;
