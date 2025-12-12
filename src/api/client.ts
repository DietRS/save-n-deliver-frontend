import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default client;
