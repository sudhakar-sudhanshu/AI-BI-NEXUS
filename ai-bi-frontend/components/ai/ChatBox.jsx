"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatBox({ selectedPrompt }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (selectedPrompt) setInput(selectedPrompt);
  }, [selectedPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/chat", {
        query: input,
      });

      const aiMsg = {
        role: "ai",
        text: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error fetching AI response" },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[500px] bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">

      <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800">
        <span className="font-semibold">AI Chat</span>
        <button
          onClick={clearChat}
          className="text-xs text-red-400 hover:text-red-600"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center">
            Start conversation with AI
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-gray-800 text-gray-100 border border-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">AI typing...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-3 flex gap-2 border-t border-gray-700 bg-gray-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your data..."
          className="flex-1 bg-gray-900 text-white border border-gray-600 rounded-xl px-3 py-2 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>

    </div>
  );
}