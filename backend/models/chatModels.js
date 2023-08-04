import mongoose from "mongoose";

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
      },
    ],
    groupAdmin: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    latestMessage: { type: mongoose.Schema.Types.ObjectID, ref: "Message" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;