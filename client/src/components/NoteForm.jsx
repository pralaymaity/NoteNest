import React from "react";
import { createNote } from "../service/noteService";
import { useState } from "react";

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags.split(",")));
    formData.append("isArchived", isArchived);
    images.forEach((img) => formData.append("images", img));
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await createNote(formData);

      onNoteCreated(res.data);
      setTitle("");
      setContent("");
      setTags("");
      setIsArchived(false);
      setImages([]);
      setFiles([]);
      console.log("Note create Successfully");
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">
        New Note
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="5"
        required
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isArchived}
          onChange={() => setIsArchived(!isArchived)}
          className="h-4 w-4 text-blue-500"
        />
        <label className="text-gray-700">Archive this note</label>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Images
        </label>
        <label className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200">
          <span>
            {images.length
              ? `${images.length} file(s) selected`
              : "Choose images..."}
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Files
        </label>
        <label className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200">
          <span>
            {files.length
              ? `${files.length} file(s) selected`
              : "Choose files..."}
          </span>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="hidden"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
      >
        Create Note
      </button>
    </form>
  );
};

export default NoteForm;
