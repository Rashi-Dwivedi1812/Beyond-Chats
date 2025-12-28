import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeArticleContent = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);

    let content = "";

    // Prefer semantic article tags
    $("article p").each((_, el) => {
      content += $(el).text().trim() + "\n";
    });

    // Fallback if article tag not found
    if (!content.trim()) {
      $("p").each((_, el) => {
        content += $(el).text().trim() + "\n";
      });
    }

    return content.trim().slice(0, 6000); // token safety
  } catch (error) {
    console.error("❌ Failed to scrape:", url);
    return "";
  }
};