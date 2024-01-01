const messagesRouter = require("express").Router();
const Message = require("../models/message");
const Chat = require("../models/chat");
require("express-async-errors");

messagesRouter.delete(
  "/:id",

  async (req, res, next) => {
    try {
      const body = req.body;
      const message = await Message.findById(req.params.id);
      const chat = message.chat;
      await Message.findByIdAndRemove(req.params.id);
      await Chat.findOneAndUpdate(
        { _id: chat },
        { $pull: { messages: req.params.id } }
      );
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

messagesRouter.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const message = await Message.findById(req.params.id);
    const chat = message.chat;
    const updatedMessage = {
      content: body.content,
    };
    const result = await Message.findByIdAndUpdate(
      req.params.id,
      updatedMessage,
      {
        new: true,
      }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = messagesRouter;
