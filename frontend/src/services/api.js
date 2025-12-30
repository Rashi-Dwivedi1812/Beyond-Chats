import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:5000/api/articles",
});

export const fetchArticles = async () => {
  const response = await API.get("/");
  return response.data;
};
