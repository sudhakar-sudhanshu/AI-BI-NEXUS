"use client";

import ChatBox from "../../components/ai/ChatBox";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AIPage() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [dataset, setDataset] = useState([]);

  const prompts = [
    "Analyze my sales data",
    "Show business growth trends",
    "Predict next month revenue",
    "Give customer insights",
  ];

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

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-gray-400">Ask questions about your uploaded data</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelectedPrompt(p)}
            className="px-4 py-2 bg-gray-800 hover:bg-blue-600 rounded-full text-sm"
          >
            {p}
          </button>
        ))}
      </div>

      <ChatBox selectedPrompt={selectedPrompt} dataset={dataset} />

    </div>
  );
}