import "dotenv/config";
import axios from "axios";

import { googleSearch } from "./googleSearch.js";
import { scrapeArticleContent } from "./scrapeArticle.js";
import { rewriteArticle } from "./rewriteWithLLM.js";

const API_BASE = process.env.API_BASE_URL; // http://localhost:5000/api/articles

const runAutomation = async () => {
  console.log("🚀 Automation started");

  const { data: articles } = await axios.get(API_BASE);
  console.log(`📄 Articles fetched: ${articles.length}`);

  for (const article of articles) {
    // Only process ORIGINAL articles
    if (!article.isOriginal) continue;

    // Skip if already has an updated version
    const hasUpdated = articles.some(
      a => a.originalArticleId === article._id
    );
    if (hasUpdated) continue;

    console.log(`🔍 Processing: ${article.title}`);

    // 1️⃣ Google search
    const links = await googleSearch(article.title);

    if (!links.length) {
      console.log("❌ No reference links found");
      continue;
    }

    // 2️⃣ Scrape reference articles
    const references = [];

    for (const link of links) {
      const content = await scrapeArticleContent(link);
      if (content && content.length > 300) {
        references.push({ link, content });
      }
      if (references.length === 2) break;
    }

    if (references.length === 0) {
      console.log("❌ No usable reference articles");
      continue;
    }

    // 3️⃣ Rewrite using LLM
    let updatedContent;
    try {
      updatedContent = await rewriteArticle(
        article.content,
        references[0].content,
        references[1]?.content || "",
        references.map(r => r.link)
      );
    } catch (err) {
      console.log("⚠️ LLM failed, using original content");
      updatedContent = article.content;
    }

    // 4️⃣ Publish UPDATED article (CORRECT ROUTE)
    await axios.post(`${API_BASE}/update`, {
      title: article.title,
      content: updatedContent,
      references: references.map(r => r.link),
      originalArticleId: article._id,
    });

    console.log("✅ Updated article published\n");
  }

  console.log("🎉 Automation completed");
};

runAutomation();