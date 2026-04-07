"use client";

import { useEffect, useState } from "react";

export default function PowerBI() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href =
        "https://app.powerbi.com/singleSignOn?ru=https%3A%2F%2Fapp.powerbi.com%2F%3FnoSignUpCheck%3D1";
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center p-6">

      <h1 className="text-4xl font-bold mb-4">
        Advanced Analytics Portal
      </h1>

      <p className="text-lg mb-6 max-w-xl">
        You are being redirected to our advanced analytics system powered by Microsoft Power BI for deeper insights and enterprise-level reporting.
      </p>

      <div className="text-2xl font-semibold mb-6">
        Redirecting in {countdown} seconds...
      </div>

      <button
        onClick={() =>
          (window.location.href =
            "https://app.powerbi.com/singleSignOn?ru=https%3A%2F%2Fapp.powerbi.com%2F%3FnoSignUpCheck%3D1")
        }
        className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Go Now →
      </button>

      <p className="mt-6 text-sm opacity-80">
        Secure • Fast • AI-powered insights
      </p>
    </div>
  );
}