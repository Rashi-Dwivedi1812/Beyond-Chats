import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/Article.js";

const BLOG_LIST_URL = "https://beyondchats.com/blogs";
const BASE_URL = "https://beyondchats.com";

export const scrapeBeyondChats = async () => {
  console.log("🧹 Scraping BeyondChats originals...");

  const { data } = await axios.get(BLOG_LIST_URL);
  const $ = cheerio.load(data);

  // Collect unique blog links
  const links = new Set();

  $('a[href^="/blogs/"]').each((_, el) => {
    const href = $(el).attr("href");
    if (href && href !== "/blogs/") {
      links.add(`${BASE_URL}${href}`);
    }
  });

  const blogLinks = Array.from(links).slice(0, 5);

  console.log(`🔗 Found ${blogLinks.length} blog links`);

  for (const link of blogLinks) {
    try {
      const { data: html } = await axios.get(link);
      const page = cheerio.load(html);

      const title = page("h1").first().text().trim();
      const content = page("article").text().trim();

      if (!title || !content) {
        console.log("⚠️ Skipped empty article");
        continue;
      }

      // Prevent duplicates
      const exists = await Article.findOne({ title, isOriginal: true });
      if (exists) {
        console.log(`⏭️ Skipping duplicate: ${title}`);
        continue;
      }

      await Article.create({
        title,
        content,
        isOriginal: true,
        isUpdated: false,
        references: [],
      });

      console.log(`✅ Inserted original: ${title}`);
    } catch (err) {
      console.log(`❌ Failed to scrape ${link}`);
    }
  }

  console.log("🎉 Original article scraping complete");
};