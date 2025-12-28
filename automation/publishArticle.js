import axios from "axios";

export const publishUpdatedArticle = async (
  articleId,
  updatedContent,
  references
) => {
  await axios.put(
    `${process.env.API_BASE_URL}/${articleId}`,
    {
      content: updatedContent,
      isUpdated: true,
      references
    }
  );

  console.log(`✅ Article ${articleId} updated & published`);
};
