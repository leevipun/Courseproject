import UserType from "../types";
const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
require("express-async-errors");

usersRouter.post("/", async (req: any, res: any) => {
  const { username, name, password }: UserType = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});
