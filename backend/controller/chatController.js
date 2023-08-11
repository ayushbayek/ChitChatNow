import asyncHandler from "express-async-handler";
import Chat from "../models/chatModels.js";
import User from "../models/userModel.js";

// it is for accessing chat between two user and if it doesn't exist it will create new onw
export const accessChat = asyncHandler(async (req, res) => {
  //logged in user will send the id of the of the user with whom he wants to connect
  const { userId } = req.body;
  if (!userId) {
    console.log("user param are not sent with request");
    res.status(400);
  }

  if (userId == req.user._id) {
    return res.status(400).send("New chat can't be created between same user");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  console.log(isChat);
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email pic",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    try {
      const newChat = await Chat.create({
        chatName: "sender",
        users: [req.user._id, userId],
      });
      const fullChat = await Chat.findById(newChat._id).populate(
        "users",
        "-password"
      );
      res.send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// for fetching all chat either one-to-one or group
export const fetchChats = asyncHandler(async (req, res) => {
  try {
    await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name email pic",
        });

        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// it is help in creating group chat
export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    return res.status(400).send("Plaese fill all the detalis");
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("Atleast 2 people needed for creating a group");
  }

  // users.push(req.user) will also work. Feature of mongoose
  users.push(req.user._id.valueOf());
  //   console.log(req.user._id.valueOf());
  try {
    const newGroup = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id.valueOf(),
    });

    const fullGroupChat = await Chat.findById(newGroup._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    // console.log(error);
    throw new Error(error.message);
  }
});

// It will help in renaming the group name
export const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updatedChat);
  }
});

// Add new member to the group
// problem=> same user can be added multiple times
export const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(added);
  }
});

// Remove a member from the group
// problem:=> admin can also be deleated even after that admin field will not change
export const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(added);
  }
});
