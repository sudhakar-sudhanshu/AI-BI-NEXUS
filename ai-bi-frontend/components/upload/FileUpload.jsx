"use client";

import { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/upload/",
        formData
      );

      setPreview(res.data.preview);
      setSummary(res.data.summary);

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <input
        type="file"
        onChange={(e) => handleFile(e.target.files[0])}
        className="mb-4"
      />

      {loading && <p>Uploading...</p>}

      {summary && (
        <div className="mb-4">
          <p><strong>Rows:</strong> {summary.rows}</p>
          <p><strong>Columns:</strong> {summary.columns.join(", ")}</p>
        </div>
      )}

      {preview.length > 0 && (
        <div className="overflow-auto max-h-80 border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(preview[0]).map((key) => (
                  <th key={key} className="p-2 border">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="p-2 border">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}