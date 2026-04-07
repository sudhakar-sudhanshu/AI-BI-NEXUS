"use client";

import FileUpload from "@/components/upload/FileUpload";

export default function Upload() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Upload Data
        </h1>
        <p className="text-gray-500 mt-1">
          Upload your dataset to generate AI-powered insights and dashboards.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Upload File
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
          <FileUpload />
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow border border-gray-200">
          <h3 className="font-semibold mb-3 text-gray-700">Tips</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Use clean CSV format</li>
            <li>Include columns: month, sales, profit</li>
            <li>Avoid missing or null values</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border border-gray-200">
          <h3 className="font-semibold mb-3 text-gray-700">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Charts will be generated automatically</li>
            <li>AI will analyze your data</li>
            <li>Reports will be created</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400">
        Your data is processed securely
      </div>

    </div>
  );
}