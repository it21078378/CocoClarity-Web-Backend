import express from "express";
const router = express.Router();

import {
    getPrivateMessages,
    sendPrivateMessage,
  } from "../controllers/messageController.js";

router.post('/private-messages/fetch', getPrivateMessages);
router.post('/private-messages', sendPrivateMessage);

export default router;
