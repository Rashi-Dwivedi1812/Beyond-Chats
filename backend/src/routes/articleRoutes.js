import express from "express";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import { scrapeOldestArticles } from "../services/scrapeBeyondChats.js";

const router = express.Router();

// CRUD routes
router.get("/", getAllArticles);
router.get("/:id", getArticle);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

// SCRAPER route
router.post("/scrape", async (req, res) => {
  try {
    await scrapeOldestArticles();
    res.json({ message: "Scraping completed successfully" });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Scraping failed" });
  }
});

export default router;
