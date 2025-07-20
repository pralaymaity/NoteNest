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
  
  const response = await axios.put(`${API_URL}/notes/${noteId}`, updatedFields, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};