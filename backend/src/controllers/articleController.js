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
    // Prevent duplicate originals
    const existing = await Article.findOne({
      title: req.body.title,
      isOriginal: true,
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      references: req.body.references || [],
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

    // Prevent duplicate AI versions
    const exists = await Article.findOne({
      originalArticleId,
      isUpdated: true,
    });

    if (exists) {
      return res.status(200).json(exists);
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

/* =========================
   SCRAPE original blogs
========================= */
export const scrapeArticles = async (req, res) => {
  try {
    await scrapeBeyondChats();
    res.json({ message: "Scraping completed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
};