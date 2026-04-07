"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Reports() {
  const [dataset, setDataset] = useState([]);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/chart/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDataset(res.data);
        } else {
          setDataset([]);
        }
      })
      .catch(() => setDataset([]));
  }, []);

  const totalSales = dataset.reduce((a, b) => a + (b.sales || 0), 0);
  const totalProfit = dataset.reduce((a, b) => a + (b.profit || 0), 0);

  const generateReport = async () => {
    setLoading(true);
    setError("");
    setReport("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/chat", {
        data: dataset,
        query:
          "Generate a detailed business report including summary, trends, insights, risks, and recommendations",
      });

      setReport(res.data.answer);
    } catch {
      setError("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Report.txt";
    a.click();
  };

  const downloadPDF = () => {
    window.open("http://127.0.0.1:8000/reports/download", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 space-y-8">

      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          AI Reports
        </h1>
        <p className="text-gray-400 mt-2">
          Generate intelligent business reports powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-2xl">
          <h3 className="text-gray-400">Total Sales</h3>
          <p className="text-2xl text-green-400 font-bold">₹{totalSales}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl">
          <h3 className="text-gray-400">Total Profit</h3>
          <p className="text-2xl text-blue-400 font-bold">₹{totalProfit}</p>
        </div>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl">
        <h2 className="mb-4">Dataset Preview</h2>

        {dataset.length === 0 ? (
          <p className="text-red-400">No data available</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th>Month</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((d, i) => (
                <tr key={i} className="text-center border-t border-gray-700">
                  <td>{d.month}</td>
                  <td>₹{d.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={generateReport}
        className="bg-green-600 px-6 py-3 rounded-xl"
      >
        {loading ? "Generating..." : "Generate AI Report"}
      </button>

      {error && <p className="text-red-400">{error}</p>}

      {loading && <p>AI analyzing...</p>}

      {report && (
        <div className="bg-white/10 p-6 rounded-2xl space-y-4">
          <h2>AI Report</h2>

          <pre className="whitespace-pre-wrap">{report}</pre>

          <div className="flex gap-4">
            <button onClick={downloadReport}>TXT</button>
            <button onClick={downloadPDF}>PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}