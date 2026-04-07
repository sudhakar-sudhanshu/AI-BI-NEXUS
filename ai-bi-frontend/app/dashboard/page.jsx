"use client";

import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dataset = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 700 },
    { name: "Wed", value: 500 },
    { name: "Thu", value: 900 },
    { name: "Fri", value: 1200 },
  ];

  const total = dataset.reduce((a, b) => a + b.value, 0);
  const max = Math.max(...dataset.map((d) => d.value));
  const avg = Math.round(total / dataset.length);

  const getInsights = async () => {
    setLoading(true);
    setError("");
    setInsight("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/", {
        data: dataset,
        query:
          "Analyze this dataset and give trends, insights, and suggestions",
      });

      setInsight(res.data.answer);
    } catch (err) {
      setError("Failed to fetch AI insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 space-y-8">

      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          AI Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Smart analytics powered by AI insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h3 className="text-gray-400">Total Value</h3>
          <p className="text-2xl font-bold text-blue-400">{total}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h3 className="text-gray-400">Max Value</h3>
          <p className="text-2xl font-bold text-purple-400">{max}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h3 className="text-gray-400">Average</h3>
          <p className="text-2xl font-bold text-green-400">{avg}</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <h2 className="font-semibold mb-4">Weekly Data</h2>
        <div className="flex justify-between">
          {dataset.map((d, i) => (
            <div key={i} className="text-center">
              <p className="text-gray-400">{d.name}</p>
              <div
                className="bg-gradient-to-t from-blue-500 to-purple-500 w-6 rounded mt-2"
                style={{ height: `${d.value / 10}px` }}
              ></div>
              <p className="mt-2 text-sm">{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={getInsights}
        className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
      >
        {loading ? "Analyzing..." : "Generate AI Insights"}
      </button>

      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-800 p-4 rounded-xl animate-pulse">
          AI is analyzing your data...
        </div>
      )}

      {insight && (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-xl font-semibold">AI Insights</h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
            {insight}
          </p>
        </div>
      )}

    </div>
  );
}