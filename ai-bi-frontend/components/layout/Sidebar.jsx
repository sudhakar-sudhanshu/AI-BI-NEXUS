"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload", path: "/upload" },
    { name: "Visualization", path: "/visualization" },
    { name: "AI Insights", path: "/ai" },
    { name: "Power BI", path: "/powerbi" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6 shadow-2xl">

      <h1 className="text-3xl font-bold mb-10 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        AI BI
      </h1>

      <ul className="space-y-3">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`relative flex items-center px-5 py-3 rounded-xl transition-all duration-300 group
                  
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105"
                      : "hover:bg-gray-700/60 hover:scale-105"
                  }
                `}
              >
                <span
                  className={`absolute inset-0 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition ${
                    isActive ? "bg-blue-500" : "bg-transparent"
                  }`}
                ></span>

                <span
                  className={`relative z-10 font-medium tracking-wide
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="absolute bottom-6 left-6 text-xs text-gray-400">
        Premium Dashboard
      </div>
    </div>
  );
}