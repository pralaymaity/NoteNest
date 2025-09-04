import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

export const createNote = async (formData) => {
  const response = await axios.post(`${API_URL}/notes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateNote = async (noteId, updatedFields) => {
  //console.log(updatedFields);

  const token = localStorage.getItem("token");
  const formData = new FormData();

  // multer does not contain json data
  formData.append("title", updatedFields.title);
  formData.append("content", updatedFields.content);
  formData.append("tags", JSON.stringify(updatedFields.tags));
  formData.append("isArchived", updatedFields.isArchived);

  // Append files (if any)
  if (updatedFields.images) {
    updatedFields.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  if (updatedFields.files) {
    updatedFields.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  console.log(formData);

  const response = await axios.put(`${API_URL}/notes/${noteId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Fetch all users from DB
export const getAllUsers = async () => {
  const res = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Share note with selected users
export const shareNoteWithUsers = async (noteId, selectedUsers) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API_URL}/shareNote/${noteId}`,
    { users: selectedUsers }, // 👈 send array of { userId, type }
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};
