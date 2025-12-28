import "dotenv/config";
import axios from "axios";

import { googleSearch } from "./googleSearch.js";
import { scrapeArticleContent } from "./scrapeArticle.js";
import { rewriteArticle } from "./rewriteWithLLM.js";
import { publishUpdatedArticle } from "./publishArticle.js";

const runAutomation = async () => {
  const { data: articles } = await axios.get(process.env.API_BASE_URL);

  for (let article of articles) {
    if (article.isUpdated) continue;

    console.log(`🔍 Processing: ${article.title}`);

    // 1. Google search
    const links = await googleSearch(article.title);
    if (links.length < 2) {
      console.log("❌ Not enough reference articles found");
      continue;
    }

    // 2. Scrape references
    const ref1 = await scrapeArticleContent(links[0]);
    const ref2 = await scrapeArticleContent(links[1]);

    if (!ref1 || !ref2) continue;

    // 3. Rewrite using LLM
    const updatedContent = await rewriteArticle(
      article.content,
      ref1,
      ref2,
      links
    );

    // 4. Publish
    await publishUpdatedArticle(
      article._id,
      updatedContent,
      links
    );
  }
};

runAutomation();
