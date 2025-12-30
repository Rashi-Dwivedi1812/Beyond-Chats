import Article from "../models/Article.js";
import { scrapeBeyondChats } from "../services/scrapeBeyondChats.js";

/* =========================
   GET all articles
========================= */
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   CREATE original article
========================= */
export const createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      ...req.body,
      isOriginal: true,
      isUpdated: false,
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   CREATE AI-updated article
========================= */
export const createUpdatedArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      references,
      originalArticleId,
    } = req.body;

    if (!originalArticleId) {
      return res.status(400).json({
        error: "originalArticleId is required",
      });
    }

    const updatedArticle = await Article.create({
      title,
      content,
      references,
      isOriginal: false,
      isUpdated: true,
      originalArticleId,
    });

    res.status(201).json(updatedArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const scrapeArticles = async (req, res) => {
  try {
    await scrapeBeyondChats();
    res.json({ message: "Scraping completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
};
