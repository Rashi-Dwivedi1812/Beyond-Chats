import express from "express";
import {
  getArticles,
  createArticle,
  createUpdatedArticle,
  scrapeArticles,
} from "../controllers/articleController.js";

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.post("/update", createUpdatedArticle);
router.post("/scrape", scrapeArticles); 

export default router;  