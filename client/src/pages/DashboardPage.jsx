import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { noteDashBoadService } from "../service/noteDashBoadService";

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  console.log(notes);

  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id; // assuming your token payload contains `id`
    //console.log(userId);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await noteDashBoadService(userId);
      setNotes(res);
    } catch (err) {
      console.log("faild to fetch data", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📒 My Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`bg-white rounded-2xl shadow-md p-5 border ${
              note.isArchived ? "border-yellow-500" : "border-green-500"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {note.title}
            </h2>
            <p className="text-gray-600 mb-3">{note.content}</p>

            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {note.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Images */}
            {note.imagePaths.length > 0 && (
              <div className="flex overflow-x-auto gap-2 mt-3">
                {note.imagePaths.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
                    alt={`note-img-${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {/* Files */}
            {note.filePaths.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-sm mb-1">📁 Files:</p>
                <ul className="text-sm text-blue-600 underline">
                  {note.filePaths.map((file, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <a
                        href={`http://localhost:5000/${file.replace(
                          /\\/g,
                          "/"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download // 👈 enables download
                      >
                        File {i + 1}
                      </a>
                      <a
                        href={`http://localhost:5000/${file.replace(/\\/g,"/")}`}                                                              
                        download
                        title="Download file"
                      >
                        💾
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Archived status */}
            <p
              className={`mt-4 text-sm font-medium ${
                note.isArchived ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {note.isArchived ? "📦 Archived" : "✅ Active"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;






