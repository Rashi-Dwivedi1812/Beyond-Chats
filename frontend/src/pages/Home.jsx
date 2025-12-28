import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map(article => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
