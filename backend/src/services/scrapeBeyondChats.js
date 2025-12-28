import axios from "axios";
import cheerio from "cheerio";
import Article from "../models/Article.js";

export const scrapeOldestArticles = async () => {
  const { data } = await axios.get("https://beyondchats.com/blogs/");
  const $ = cheerio.load(data);

  const articles = [];

  $(".blog-card").slice(-5).each((i, el) => {
    articles.push({
      title: $(el).find("h2").text().trim(),
      url: $(el).find("a").attr("href"),
    });
  });

  for (let article of articles) {
    const page = await axios.get(article.url);
    const $$ = cheerio.load(page.data);

    article.content = $$(".blog-content").text().trim();

    await Article.create(article);
  }
};
