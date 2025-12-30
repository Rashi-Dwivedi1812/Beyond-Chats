import { ExternalLink, RefreshCw } from 'lucide-react';

const ArticleCard = ({ article }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 -mt-16" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {article.title}
          </h2>
          <span
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
              article.isUpdated
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
            }`}
          >
            {article.isUpdated && <RefreshCw className="w-3 h-3" />}
            {article.isUpdated ? "Updated" : "Original"}
          </span>
        </div>

        {/* Content */}
        <p className="text-gray-600 leading-relaxed line-clamp-5 mb-6">
          {article.content}
        </p>

        {/* References */}
        {article.references?.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              References
            </h4>
            <ul className="space-y-2">
              {article.references.map((ref, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-xs text-gray-400 mt-0.5">→</span>
                  <a
                    href={ref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors break-all"
                  >
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;