// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/data.js";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";
import router from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();

// It will tell the backend to use Json data which is obtained from the server
app.use(express.json());

// Setting cors for all sites
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", router);

// temp chat api
app.get("/api/chat", (req, res) => res.send(chats));

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server is working ${PORT}`.yellow.bold));
