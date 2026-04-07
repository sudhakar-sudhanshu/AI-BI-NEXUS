export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">

      <h1 className="text-4xl font-bold mb-4">
        AI Business Intelligence Platform
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Transform your raw data into powerful insights using AI, analytics, and interactive dashboards.
      </p>

      <div className="flex gap-4">
        
        <a
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </a>

        <a
          href="/upload"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition"
        >
          Upload Data
        </a>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Analytics</h2>
          <p className="text-gray-500">
            Visualize your data with charts and dashboards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">AI Insights</h2>
          <p className="text-gray-500">
            Ask questions and get intelligent answers from your data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">Reports</h2>
          <p className="text-gray-500">
            Generate and download professional reports instantly.
          </p>
        </div>

      </div>

    </div>
  );
}