const chatsRouter = require("express").Router();
const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const extractToken = require("../utils/middleware").extractToken;

chatsRouter.get("/", extractToken, async (req, res) => {
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const chats = await Chat.find({
      users: { $all: [deCodedToken.id] },
    }).exec();

    res.json(chats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

chatsRouter.post("/", extractToken, async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body.id);
    console.log(req.token);
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(deCodedToken.id);
    const author = await User.findById(body.id);

    const userChats = await Chat.find({
      users: { $all: [user._id, author._id] },
    }).exec();

    console.log("author", author);

    console.log("userChats", userChats);
    if (userChats.length > 0) {
      if (userChats[0].users.includes(body.id)) {
        const messages = await Message.find({
          chat: userChats[0]._id,
        });
        console.log("messages", messages);
        return res
          .status(200)
          .json({ id: userChats[0]._id, messages: messages });
      }
    }

    const newChat = new Chat({
      users: [deCodedToken.id, body.id],
      userNames: [
        `${user.firstname} ${user.lastname}`,
        `${author.firstname} ${author.lastname}`,
      ],
      messages: [],
    });
    const savedChat = await newChat.save();
    const user1 = await User.findById(deCodedToken.id);
    const user2 = await User.findById(body.id);
    user1.chats = user1.chats.concat(savedChat.id);
    user2.chats = user2.chats.concat(savedChat.id);
    await user1.save();
    await user2.save();
    res.json({ message: savedChat._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

chatsRouter.post("/post/:id", async (req, res) => {
  try {
    const body = req.body;
    const chat = await Chat.findById(req.params.id);
    if (chat) {
      const message = new Message({
        chat: chat._id,
        sender: body.sender,
        senderId: body.senderId,
        content: body.content,
        date: new Date(),
      });
      const savedMessage = await message.save();
      chat.messages = chat.messages.concat(savedMessage._id);
      chat.lastMessage = `${body.sender}: ${body.content}`;
      await chat.save();
      res.json({ message: message });
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

chatsRouter.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (chat) {
      const messages = await Message.find({ chat: chat._id });
      res.json({ messages: messages });
    } else {
      response.status(404).json({ error: "Chat not found" }).end();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = chatsRouter;
