import express from 'express';
import { fetchTweets } from '../controllers/twitterController.js';

const router = express.Router();

router.get('/tweets', fetchTweets);

export default router;
