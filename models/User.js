import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    default: "user",
  },
  isAdmin: {
    type: Boolean,
  },
  chatGroups: {
    type: [String],
  },
  quizTaken: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model("User", userSchema);
export default User;
