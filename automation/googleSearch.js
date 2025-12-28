import axios from "axios";

export const googleSearch = async (query) => {
  const url = "https://serpapi.com/search.json";

  const response = await axios.get(url, {
    params: {
      q: query,
      api_key: process.env.SERP_API_KEY,
      num: 5
    }
  });

  // Filter blog/article links, exclude BeyondChats
  const organicResults = response.data.organic_results || [];

  const filtered = organicResults
    .map(r => r.link)
    .filter(link =>
      link &&
      !link.includes("beyondchats.com") &&
      (link.includes("blog") || link.includes("article"))
    );

  return filtered.slice(0, 2);
};
