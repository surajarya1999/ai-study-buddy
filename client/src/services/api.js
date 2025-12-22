import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MONGO_live_URl,
  withCredentials: true,
});

export default api;
