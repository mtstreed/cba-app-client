export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6f3ff] flex flex-col items-center p-8">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        <h1 className="text-[#0a1829] text-4xl font-bold mt-8">
          Generate CBA Draft
        </h1>
        
        <h2 className="text-[#2d3748] text-xl">
          Describe your renewable energy project.
        </h2>

        <div className="w-full bg-white rounded-lg shadow-lg p-8 mt-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 text-[#5dbea3]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                />
                <path d="M7 8H17M7 12H17M7 16H13" />
              </svg>
            </div>
            <textarea
              className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5dbea3] focus:border-transparent text-[#1a202c] placeholder-[#4a5568]"
              placeholder="Describe the project..."
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button className="px-8 py-3 bg-[#7fb8e6] text-white rounded-full hover:bg-[#6aa8d8] transition-colors">
            Preview
          </button>
          <button className="px-8 py-3 bg-[#5dbea3] text-white rounded-full hover:bg-[#4aab90] transition-colors">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
