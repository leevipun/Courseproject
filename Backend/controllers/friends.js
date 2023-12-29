const friendsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
require("express-async-errors");
const extractToken = require("../utils/middleware").extractToken;
const extractUser = require("../utils/middleware").extractUser;
const User = require("../models/user");
const FriendReq = require("../models/friendReq");

friendsRouter.post("/", extractUser, extractToken, async (req, res, next) => {
  try {
    const body = req.body;
    console.log("body", body);
    console.log("Request user", req.user);

    if (!req.token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const deCodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const reciverId = body.id;
    const reciver = await User.findById(reciverId);
    console.log("reciver", reciver);

    if (!reciver) {
      return res.status(400).json({ error: "User not found" });
    }

    if (reciverId === deCodedToken.id) {
      return res.status(400).json({ error: "You cannot add yourself" });
    }

    const sender = await User.findById(deCodedToken.id);
    console.log("sender", sender);

    if (sender.friends.includes(reciverId)) {
      return res.status(400).json({ error: "You are already friends" });
    }

    sender.friends = sender.friends.concat(reciverId);

    const savedSender = await sender.save();

    res.json(savedSender);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ error: "Error occurred while adding friend" });
  }
});

friendsRouter.post(
  "/sendRequest",
  extractUser,
  extractToken,
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log("body", body);
      console.log("Request user", req.user);

      if (!req.token) {
        return res.status(401).json({ error: "Token not provided" });
      }

      const deCodedToken = jwt.verify(req.token, process.env.SECRET);

      if (!deCodedToken.id) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const reciverId = body.id;
      const reciver = await User.findById(reciverId);
      console.log("reciver", reciver);

      if (!reciver) {
        return res.status(400).json({ error: "User not found" });
      }

      if (reciverId === deCodedToken.id) {
        return res.status(400).json({ error: "You cannot add yourself" });
      }

      const sender = await User.findById(deCodedToken.id);
      console.log("sender", sender);

      const friendReq = new FriendReq({
        sender: sender._id,
        senderName: `${sender.firstname} ${sender.lastname}`,
        receiver: reciver._id,
        status: "Pending",
      });

      const senderFriendReq = await FriendReq.findById(sender.friendReq);

      console.log("senderFriendReq", senderFriendReq);

      if (senderFriendReq) {
        if (
          senderFriendReq.receiver.includes(reciver.id) ||
          senderFriendReq.sender.includes(reciverId.id)
        ) {
          return res.status(400).json({ error: "Friend request already sent" });
        }
      }

      console.log("friendReq", friendReq);

      const savedFriendReq = await friendReq.save();

      console.log("savedFriendReq", savedFriendReq);

      reciver.friendReq = reciver.friendReq.concat(savedFriendReq._id);
      await reciver.save();

      sender.friendReq = sender.friendReq.concat(savedFriendReq._id);
      await sender.save();

      res.json(savedFriendReq);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send({ error: "Error occurred while adding friend" });
    }
  }
);

friendsRouter.get("/", extractUser, extractToken, async (req, res, next) => {
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = req.user;
    console.log("friends", user.friends);
    const friends = await User.find({ _id: { $in: user.friends } });
    console.log(friends);
    res.json(friends);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ error: "Error occurred while getting friends" });
  }
});

friendsRouter.get(
  "/requests",
  extractUser,
  extractToken,
  async (req, res, next) => {
    try {
      const deCodedToken = jwt.verify(req.token, process.env.SECRET);
      if (!deCodedToken.id) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = req.user;
      console.log("friends", user.friends);
      console.log("KÄYTTÄJÄ", user.friendReq);

      // Assuming user.friendReq is an array of friend request IDs
      const friendRequests = await FriendReq.find({
        _id: { $in: user.friendReq },
      });

      console.log("requests", friendRequests);
      res.json(friendRequests);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send({ error: "Error occurred while getting friend requests" });
    }
  }
);

friendsRouter.put("/accept", extractToken, async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);

    if (!req.token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const friendReqId = body.id;
    const friendReq = await FriendReq.findById(friendReqId);
    console.log("friendReq", friendReq);

    if (!friendReq) {
      return res.status(400).json({ error: "Friend request not found" });
    }

    const sender = await User.findById(friendReq.sender);
    const receiver = await User.findById(friendReq.receiver);

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender or receiver not found" });
    }

    if (
      sender.friends.includes(receiver._id) ||
      receiver.friends.includes(sender._id)
    ) {
      return res.status(400).json({ error: "You are already friends" });
    }

    console.log("sender", sender);
    console.log("receiver", receiver);

    sender.friends = sender.friends.concat(receiver._id);
    await sender.save();

    receiver.friends = receiver.friends.concat(sender._id);
    await receiver.save();

    friendReq.status = "Accepted";
    await friendReq.save();

    const filteredReqs = receiver.friendReq.filter(
      (id) => id.toString() !== friendReqId.toString()
    );
    console.log("filteredReqs", filteredReqs, filteredReqs.length);
    res.json(filteredReqs);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Error occurred while accepting friend request" });
  }
});

friendsRouter.delete("/requests/:id", extractToken, async (req, res) => {
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const friendReqId = req.params.id;
    const friendReq = await FriendReq.findById(friendReqId);
    const reciver = await User.findById(friendReq.receiver);
    const sender = await User.findById(friendReq.sender);
    if (!friendReq) {
      return res.status(400).json({ error: "Friend request not found" });
    }
    await User.findOneAndUpdate(
      { _id: reciver._id },
      { $pull: { friendReq: friendReqId } }
    );
    await User.findOneAndUpdate(
      { _id: sender._id },
      { $pull: { friendReq: friendReqId } }
    );
    await FriendReq.findByIdAndRemove(friendReqId);
    const filteredReqs = reciver.friendReq.filter(
      (id) => id.toString() !== friendReqId.toString()
    );
    res.json(filteredReqs);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Error occurred while deleting friend request" });
  }
});

module.exports = friendsRouter;
