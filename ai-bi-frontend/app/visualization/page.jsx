"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function Visualization() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [insight, setInsight] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/chart/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.log("Invalid data:", res.data);
          setData([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData = (Array.isArray(data) ? data : []).map((item) => ({
    name: item.month ?? item.Month ?? item.name ?? "N/A",

    ...(filter !== "Profit" && {
      sales: Number(
        item.sales ??
        item.Sales ??
        item.revenue ??
        item.Revenue ??
        0
      ),
    }),

    ...(filter !== "Sales" && {
      profit: Number(
        item.profit ??
        item.Profit ??
        0
      ),
    }),
  }));

  const totalSales = (Array.isArray(data) ? data : []).reduce(
    (a, b) =>
      a +
      Number(
        b.sales ??
        b.Sales ??
        b.revenue ??
        b.Revenue ??
        0
      ),
    0
  );

  const totalProfit = (Array.isArray(data) ? data : []).reduce(
    (a, b) =>
      a +
      Number(
        b.profit ??
        b.Profit ??
        0
      ),
    0
  );

  const getAIInsights = async () => {
    if (!filteredData.length) return;

    setAiLoading(true);
    setInsight("");
    setAiError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/", {
        data: filteredData,
        query: "Analyze trends and give business insights",
      });
      setInsight(res.data.answer);
    } catch {
      setAiError("AI analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-blue-400">
          Data Visualization
        </h1>
        <p className="text-gray-400 mt-2">
          Smart analytics with AI-powered insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-2xl">
          <p className="text-gray-400">Total Sales</p>
          <h2 className="text-2xl text-blue-400 font-bold">₹{totalSales}</h2>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl">
          <p className="text-gray-400">Total Profit</p>
          <h2 className="text-2xl text-green-400 font-bold">₹{totalProfit}</h2>
        </div>
      </div>

      <div className="flex gap-4">
        <select
          className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Sales</option>
          <option>Profit</option>
        </select>

        <button
          onClick={getAIInsights}
          className="bg-blue-600 px-5 py-2 rounded-xl"
        >
          {aiLoading ? "Analyzing..." : "AI Insights"}
        </button>
      </div>

      {!loading && filteredData.length === 0 && (
        <p className="text-red-400">No valid data found</p>
      )}

      {loading ? (
        <p>Loading charts...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white/10 p-5 rounded-2xl">
            <h3>Bar Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Legend />
                {filter !== "Profit" && (
                  <Bar dataKey="sales" fill="#3b82f6" />
                )}
                {filter !== "Sales" && (
                  <Bar dataKey="profit" fill="#10b981" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl">
            <h3>Line Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                {filter !== "Profit" && (
                  <Line dataKey="sales" stroke="#3b82f6" />
                )}
                {filter !== "Sales" && (
                  <Line dataKey="profit" stroke="#10b981" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl md:col-span-2">
            <h3>Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData}
                  dataKey={filter === "Profit" ? "profit" : "sales"}
                  nameKey="name"
                  outerRadius={100}
                  fill="#6366f1"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}

      {aiLoading && <p>AI analyzing...</p>}

      {aiError && (
        <p className="text-red-400">{aiError}</p>
      )}

      {insight && (
        <div className="bg-white/10 p-6 rounded-2xl">
          <h2 className="font-semibold mb-2">AI Insights</h2>
          <p>{insight}</p>
        </div>
      )}

    </div>
  );
}