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

usersRouter.put("/", async (req, res) => {
  const body = req.body;
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findOne({ email: deCodedToken.email });
    console.log(user);
    const item = {
      email: body.email,
      name: body.name,
      address: body.address,
      phone: body.phone,
    };
    console.log(item);
    const updatedUser = await User.findByIdAndUpdate(user._id, item, {
      new: true,
    });
    console.log(updatedUser);
    await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log("Tänne :(");
    console.error(error);
    return res.status(400).send("Error occurred while updating user");
  }
});

usersRouter.put("/password", async (req, res) => {
  const body = req.body;
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findOne({ email: deCodedToken.email });
    console.log(user);
    const passwordCorrect = await bcrypt.compare(
      body.password,
      user.passwordHash
    );
    if (passwordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const item = {
      passwordHash: passwordHash,
    };
    console.log(item);
    const updatedUser = await User.findByIdAndUpdate(user._id, item, {
      new: true,
    });
    console.log(updatedUser);
    await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log("Tänne :(");
    console.error(error);
    return res.status(400).send("Error occurred while updating user");
  }
});

usersRouter.delete("/", async (req, res) => {
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findOne({ email: deCodedToken.email });
    await User.findByIdAndRemove(user._id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error occurred while deleting user");
  }
});

module.exports = usersRouter;
