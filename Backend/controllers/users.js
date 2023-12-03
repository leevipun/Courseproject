const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
require("express-async-errors");

const extractToken = middleware.extractToken;

usersRouter.post("/", async (req, res) => {
  const { email, name, password, style, id } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email: email,
    name: name,
    passwordHash: passwordHash,
    style: style,
    id: id,
  });
  console.log(user);

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get("/info", extractToken, async (req, res) => {
  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const user = await User.findOne({ email: deCodedToken.email });
  res.json(user);
});

module.exports = usersRouter;
