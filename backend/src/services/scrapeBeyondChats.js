import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/Article.js";

export const scrapeOldestArticles = async () => {
  console.log("🔍 Scraper started");

  const { data } = await axios.get("https://beyondchats.com/blogs/", {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(data);

  const articleLinks = [];

  // PRIMARY selector
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (
      href &&
      href.includes("/blogs/") &&
      !href.includes("#") &&
      articleLinks.length < 5
    ) {
      const fullUrl = href.startsWith("http")
        ? href
        : `https://beyondchats.com${href}`;
      articleLinks.push(fullUrl);
    }
  });

  console.log("🧩 Article links found:", articleLinks.length);

  let insertedCount = 0;

  for (const link of articleLinks) {
    const page = await axios.get(link, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $$ = cheerio.load(page.data);

    const title =
      $$("h1").first().text().trim() ||
      $$("title").text().trim();

    let content = "";
    $$("p").each((_, p) => {
      content += $$(p).text().trim() + "\n";
    });

    if (!title || content.length < 100) {
      console.log("⚠️ Skipping weak article:", link);
      continue;
    }

    await Article.create({
      title,
      content,
      url: link,
      isUpdated: false,
      references: [],
    });

    insertedCount++;
  }

  console.log("✅ Scraper finished");
  console.log("📦 Articles inserted:", insertedCount);
};