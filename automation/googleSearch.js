import axios from "axios";

export const googleSearch = async (query) => {
  const url = "https://serpapi.com/search.json";

  const response = await axios.get(url, {
    params: {
      q: query,
      api_key: process.env.SERP_API_KEY,
      num: 10,
    },
  });

  const organicResults = response.data.organic_results || [];

  const links = organicResults
    .map(r => r.link)
    .filter(link =>
      link &&
      !link.includes("beyondchats.com") &&
      !link.includes("youtube.com") &&
      !link.includes(".pdf")
    );

  // Return first 2 valid links
  return links.slice(0, 2);
};