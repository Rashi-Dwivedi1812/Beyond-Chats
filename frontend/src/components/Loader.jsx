const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Outer ring */}
        <div className="animate-spin h-16 w-16 border-4 border-gray-200 border-t-blue-600 rounded-full" />
        {/* Inner ring */}
        <div className="absolute top-2 left-2 animate-spin h-12 w-12 border-4 border-gray-100 border-t-purple-600 rounded-full" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full animate-pulse" />
      </div>
      <p className="mt-6 text-sm font-medium text-gray-600 animate-pulse">Loading articles...</p>
    </div>
  );
};

export default Loader;