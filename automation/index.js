import "dotenv/config";
import axios from "axios";

import { googleSearch } from "./googleSearch.js";
import { scrapeArticleContent } from "./scrapeArticle.js";
import { rewriteArticle } from "./rewriteWithLLM.js";
import { publishUpdatedArticle } from "./publishArticle.js";

const runAutomation = async () => {
  console.log("🚀 Automation started");

  const { data: articles } = await axios.get(process.env.API_BASE_URL);
  console.log(`📄 Articles fetched: ${articles.length}`);

  for (const article of articles) {
    if (article.isUpdated) continue;

    console.log(`🔍 Processing: ${article.title}`);

    // 1️⃣ Google search
    const links = await googleSearch(article.title);

    if (!links.length) {
      console.log("❌ No reference links found");
      continue;
    }

    // 2️⃣ Scrape references safely
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

    // 3️⃣ Rewrite using LLM (with fallback)
    let updatedContent;
    try {
      updatedContent = await rewriteArticle(
        article.content,
        references[0].content,
        references[1]?.content || "",
        references.map(r => r.link)
      );
    } catch (err) {
      console.log("⚠️ OpenAI failed, using original content");
      updatedContent = article.content;
    }

    // 4️⃣ Publish updated article
    await publishUpdatedArticle(
      article._id,
      updatedContent,
      references.map(r => r.link)
    );

    console.log("✅ Article updated\n");
  }

  console.log("🎉 Automation completed");
};

runAutomation();