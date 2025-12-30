import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    references: {
      type: [String],
      default: [],
    },

    // true only for scraped articles
    isOriginal: {
      type: Boolean,
      default: true,
    },

    // true only for AI-enhanced articles
    isUpdated: {
      type: Boolean,
      default: false,
    },

    // points to original article if this is an update
    originalArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);