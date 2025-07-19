import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

export const noteDashBoadService = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
