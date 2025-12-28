import express from "express";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from "../controllers/articleController.js";

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:id", getArticle);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
