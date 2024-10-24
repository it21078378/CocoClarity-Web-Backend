import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupMessageSchema = new Schema({
  chatRoomId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);
export default GroupMessage;
