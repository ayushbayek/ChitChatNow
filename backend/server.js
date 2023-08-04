// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/data.js";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();
connectDB();
const app = express();

// Setting cors for all sites
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.listen(PORT, console.log(`Server is working ${PORT}`.yellow.bold));
