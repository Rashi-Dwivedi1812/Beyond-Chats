import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import articleRoutes from "./src/routes/articleRoutes.js";

const app = express();
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 TEMP DEBUG LINE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/articles", articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
