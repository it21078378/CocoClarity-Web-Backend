import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import User from "../models/User.js";

const router = Router();

router.get("/details", auth, roleCheck(["user"]), (req, res) => {
  res.status(200).json({ message: "user authenticated." });
});

router.get("/my-account", auth, roleCheck(["user"]), (req, res) => {
  res.status(200).json({ message: "user authenticated." });
});

router.get('/isAdmin/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({ status: true, user });
});

router.post('/getUser', async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await Employee.findOne({ email });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

router.get("/getId/:selectedUser", async (req, res) => {
  const id = req.params.selectedUser;
  try {
    let user = await User.findOne({ userName: id });
    if (!user) {
      user = await Employee.findOne({ userName: id });
    }
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/user/:userName/chatGroups', async (req, res) => {
  const userName = req.params.userName;
  const { chatGroups } = req.body;

  if (!Array.isArray(chatGroups) || chatGroups.length === 0) {
    return res.status(400).json({ message: 'Chat groups array is required and should not be empty' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { userName: userName },
      { $addToSet: { chatGroups: { $each: chatGroups } } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Chat groups added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/user/:username/chatRooms', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    res.status(200).json({ error: false, chatRooms: user.chatGroups });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

router.post('/groups/join', async (req, res) => {
  const { userId, groupName } = req.body;

  try {
    const user = await User.findOne({ userName: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.chatGroups.includes(groupName)) {
      return res.status(200).json({ message: 'Already a member', chatGroups: user.chatGroups });
    }

    user.chatGroups.push(groupName);
    await user.save();

    res.status(200).json({ message: 'Successfully joined', chatGroups: user.chatGroups });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/groups/leave', async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    const user = await User.findOne({ userName: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const groupIndex = user.chatGroups.indexOf(groupId);
    if (groupIndex > -1) {
      user.chatGroups.splice(groupIndex, 1);
      await user.save();
      return res.status(200).json({ message: 'Successfully left', chatGroups: user.chatGroups });
    } else {
      return res.status(400).json({ message: 'Not a member of the group' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/user/quiz/:id/quiz-taken", async (req, res) => {
  const userId = req.params.id;
  const { quizTaken } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { userName: userId },
      { quizTaken: quizTaken },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error updating quizTaken field", error });
  }
});

export default router;
