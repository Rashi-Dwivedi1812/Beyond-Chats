import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/Article.js";

const BLOG_URL = "https://beyondchats.com/blogs/";

export const scrapeBeyondChats = async () => {
  const { data } = await axios.get(BLOG_URL);
  const $ = cheerio.load(data);

  const articles = [];

  $(".blog-item a").slice(-5).each((_, el) => {
    articles.push($(el).attr("href"));
  });

  for (let link of articles) {
    const { data: html } = await axios.get(link);
    const page = cheerio.load(html);

    const title = page("h1").text().trim();
    const content = page(".blog-content").text().trim();

    // Prevent duplicates
    const exists = await Article.findOne({ title, isOriginal: true });
    if (exists) continue;

    await Article.create({
      title,
      content,
      isOriginal: true,
      isUpdated: false,
    });
  }
};