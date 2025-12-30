import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../models/Article.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDemoData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear existing articles
    await Article.deleteMany({});
    console.log("🧹 Existing articles cleared");

    // Original Articles
    const original1 = await Article.create({
      title: "How Chatbots Boost Business Growth?",
      content:
        "Chatbots are transforming how businesses interact with customers by offering instant responses, 24/7 support, and scalable engagement strategies.",
      isOriginal: true,
      isUpdated: false,
    });

    const original2 = await Article.create({
      title: "10 Solutions for Common Customer Service Issues",
      content:
        "Customer service challenges such as long wait times and inconsistent responses can be solved using automation and AI-driven chat solutions.",
      isOriginal: true,
      isUpdated: false,
    });

    // Updated Articles
    await Article.create({
      title: "How Chatbots Boost Business Growth?",
      content:
        "Modern chatbots improve business growth by increasing customer engagement, reducing operational costs, and providing data-driven insights for decision-making.",
      references: [
        "https://www.ibm.com/think/insights/unlocking-the-power-of-chatbots",
        "https://www.socialintents.com/blog/do-chatbots-increase-sales/",
      ],
      isOriginal: false,
      isUpdated: true,
      originalArticleId: original1._id,
    });

    await Article.create({
      title: "10 Solutions for Common Customer Service Issues",
      content:
        "AI-powered chatbots address customer service issues by automating responses, reducing wait times, and ensuring consistent communication across channels.",
      references: [
        "https://www.proprofsdesk.com/blog/customer-service-problems/",
        "https://export.ebay.com/in/resources/weblog/10-common-customer-service-problems-and-their-solutions/",
      ],
      isOriginal: false,
      isUpdated: true,
      originalArticleId: original2._id,
    });

    console.log("🎉 Demo data seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDemoData();