import Group from "../models/Group.js";
import GroupMessage from "../models/GroupMessage.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  const { name, description } = req.body;

  const newGroup = new Group({
    name,
    description
  });

  try {
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGroupMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.query;

    if (!chatRoomId) {
      return res.status(400).json({ message: 'chatRoomId is required' });
    }

    const messages = await GroupMessage.find({ chatRoomId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGroupMessage = async (req, res) => {
  console.log(req.body)
  const { chatRoomId, message, sender } = req.body;
  

  const newMessage = new GroupMessage({
    chatRoomId,
    message,
    sender
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
