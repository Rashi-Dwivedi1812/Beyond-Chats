import { Sparkles, FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-6 shadow-lg border-b border-gray-700">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            BeyondChats Article Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 ml-14">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <p className="text-sm text-gray-300">
            Original & AI-Enhanced Articles
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;