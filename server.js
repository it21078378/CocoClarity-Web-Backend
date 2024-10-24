import express from "express";
import {config} from "dotenv";
import cors from "cors";


import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js"
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questionRoutes.js";
import groupMessageRoutes from "./routes/groupMessageRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import coconutOilRoutes from "./routes/coconutOilRoutes.js";
import twitterRoutes from "./routes/twitterRoutes.js";

import dbConnect from "./dbConnect.js";



//allows us access environment variables like dotenv files
config();

dbConnect();

const app = express();
//allows us get json object in request body
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

// const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

app.use("/questions", questionRoutes);
app.use("/api/group-messages", groupMessageRoutes);
app.use('/api/messages', messageRoutes);

app.use('/api/coconut-oils', coconutOilRoutes);
app.use('/api/twitter', twitterRoutes);


const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
// start the Express server
app.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT}`);
});