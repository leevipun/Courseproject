const listingRouter = require("express").Router();
import UserType from "../types";
const List = require("../models/listModel");
const jwt = require("jsonwebtoken");
require("express-async-errors");
const User = require("../models/userModel");
const blog = require("../models/blog");
