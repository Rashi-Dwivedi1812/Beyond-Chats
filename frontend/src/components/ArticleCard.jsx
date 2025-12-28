const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          {article.title}
        </h2>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            article.isUpdated
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {article.isUpdated ? "Updated" : "Original"}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-700 mt-4 line-clamp-5">
        {article.content}
      </p>

      {/* References */}
      {article.references?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold">References:</h4>
          <ul className="text-sm text-blue-600 list-disc list-inside">
            {article.references.map((ref, index) => (
              <li key={index}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
