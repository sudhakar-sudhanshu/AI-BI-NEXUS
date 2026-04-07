"use client";

import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("Sudhakar");
  const [email, setEmail] = useState("sudhakar@email.com");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 space-y-8">

      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Settings
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your profile and preferences
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-5">

          <h2 className="text-xl font-semibold">Profile</h2>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
              {name[0]}
            </div>
            <p className="text-gray-300">Profile Picture</p>
          </div>

          <input
            className="w-full bg-gray-800 border border-gray-600 p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            className="w-full bg-gray-800 border border-gray-600 p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Save Changes
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-5">

          <h2 className="text-xl font-semibold">Security</h2>

          <input
            type={showPass ? "text" : "password"}
            className="w-full bg-gray-800 border border-gray-600 p-3 rounded-xl"
            placeholder="Old Password"
          />

          <input
            type={showPass ? "text" : "password"}
            className="w-full bg-gray-800 border border-gray-600 p-3 rounded-xl"
            placeholder="New Password"
          />

          <button
            onClick={() => setShowPass(!showPass)}
            className="text-sm text-blue-400 hover:underline"
          >
            {showPass ? "Hide Password" : "Show Password"}
          </button>

          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>

        <button className="bg-gray-800 px-5 py-2 rounded-xl hover:bg-gray-700 transition">
          Dark Mode Enabled
        </button>
      </div>

    </div>
  );
}