import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { noteDashBoadService } from "../service/noteDashBoadService";
import {
  deleteNote,
  updateNote,
  getAllUsers,
  shareNoteWithUsers,
} from "../service/noteService";
import { Link } from "react-router-dom";
import NoteForm from "../components/NoteForm"; // 👈 import your form

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  console.log(notes);

  const [editingNote, setEditingNote] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [users, setUsers] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  //console.log(selectedUsers);

  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

  const IMG_FILE_URL = import.meta.env.VITE_IMG_FILE;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await noteDashBoadService(userId);
      setNotes(res);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };

  // 👇 instead of updating immediately, open the form
  const handleEdit = (note) => {
    setEditingNote(note);
  };

  // const handleUpdateFormSubmit = async (noteId, updatedFields) => {
  //   try {
  //     await updateNote(noteId, updatedFields);
  //     await fetchNotes();
  //     setEditingNote(null); // close form after update
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //   }
  // };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  //  Open share modal and fetch users from DB
  const openSharePopup = async (noteId) => {
    setSelectedNoteId(noteId);
    try {
      const res = await getAllUsers(); // 👈 fetch from backend
      setUsers(res);
      setShareModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const closeSharePopup = () => {
    setShareModalOpen(false);
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Call backend API to share note
  const handleShare = async () => {
    try {
      await shareNoteWithUsers(selectedNoteId, selectedUsers); // 👈 API call
      console.log("Note shared successfully");
      closeSharePopup();
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {editingNote ? (
        <NoteForm
          initialData={editingNote}
          onNoteUpdated={() => {
            fetchNotes();
            setEditingNote(null);
          }}
          onCancel={() => setEditingNote(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">📒 My Notes</h1>
            <Link
              to="/note"
              className="bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out"
            >
              ➕ Create Note
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {notes.map((note) => {
              const currentUser = note.Users?.find((u) => u.id === userId);
              const permissionType = currentUser?.Permission?.type;

              return (
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
                          src={`${IMG_FILE_URL}/${img.replace(/\\/g, "/")}`}
                          alt={`note-img-${i}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                  {/* Files */}
                  {note.filePaths.length > 0 && (
                    <div className="mt-4">
                      <p className="font-semibold text-sm mb-2">
                        📁 Attached Files
                      </p>
                      <ul className="space-y-2">
                        {note.filePaths.map((file, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
                          >
                            <div className="flex items-center gap-2 text-sm text-blue-700">
                              <span className="text-gray-600">📄</span>
                              <a
                                href={`${IMG_FILE_URL}/${file.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                File {i + 1}
                              </a>
                            </div>
                            <a
                              href={`${IMG_FILE_URL}/${file.replace(
                                /\\/g,
                                "/"
                              )}`}
                              download
                              title="Download file"
                              className="text-gray-600 hover:text-blue-600 text-lg"
                            >
                              💾
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p
                    className={`mt-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      note.isArchived
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                  >
                    {note.isArchived ? "📦 Archived" : "✅ Active"}
                  </p>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => handleEdit(note)}
                      disabled={permissionType === "read"}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          permissionType === "read"
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900"
                        }
                      `}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note.id)}
                      disabled={permissionType === "read"}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium
                      ${
                        permissionType === "read"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900"
                      } 
                      transition-all duration-200`}
                    >
                      🗑 Delete
                    </button>

                    <button
                      onClick={() => openSharePopup(note.id)}
                      disabled={permissionType === "read"}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium
                      ${
                        permissionType === "read"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-900"
                      } 
                      transition-all duration-200`}
                    >
                      🔗 Share
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Share Modal */}

          {shareModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-blue-600 bg-opacity-20 z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Share Note</h2>

                <div className="max-h-48 overflow-y-auto border rounded-lg p-2">
                  {users.map((user) => {
                    const selected = selectedUsers.find(
                      (u) => u.userId === user.id
                    );

                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between my-2.5 rounded-xl border p-3 shadow-sm hover:shadow-md transition"
                      >
                        {/* Checkbox + User Name */}
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!selected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers((prev) => [
                                  ...prev,
                                  { userId: user.id, type: "read" }, // default permission
                                ]);
                              } else {
                                setSelectedUsers((prev) =>
                                  prev.filter((u) => u.userId !== user.id)
                                );
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="font-medium text-gray-800">
                            {user.name}
                          </span>
                        </div>

                        {/* Permissions */}
                        {selected && (
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={`permission-${user.id}`}
                                value="read"
                                checked={selected.type === "read"}
                                onChange={() =>
                                  setSelectedUsers((prev) =>
                                    prev.map((u) =>
                                      u.userId === user.id
                                        ? { ...u, type: "read" }
                                        : u
                                    )
                                  )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">
                                Read
                              </span>
                            </label>

                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={`permission-${user.id}`}
                                value="write"
                                checked={selected.type === "write"}
                                onChange={() =>
                                  setSelectedUsers((prev) =>
                                    prev.map((u) =>
                                      u.userId === user.id
                                        ? { ...u, type: "write" }
                                        : u
                                    )
                                  )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">
                                Write
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={closeSharePopup}
                    className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
