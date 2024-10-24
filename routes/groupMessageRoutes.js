import express from "express";
import {
  getAllGroupMessages,
  createGroupMessage,
  createGroup,
  getAllGroups,
} from "../controllers/groupMessageController.js";

const router = express.Router();

// Get all group messages
router.get('/', getAllGroupMessages);

// Create a new group message
router.post('/', createGroupMessage);

// Create a new group
router.post('/createGroup', createGroup);

// Get all groups
router.get('/allGroups', getAllGroups);

export default router;
