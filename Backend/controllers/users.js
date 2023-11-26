const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
require("express-async-errors");

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

module.exports = usersRouter;
