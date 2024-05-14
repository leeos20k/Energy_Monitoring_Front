import axios from "axios";
import { authStore } from "Store";

const BASE_URL = "/api";
const instance = axios.create({
  baseURL: BASE_URL,
  // timeout: 5000,
  withCredentials: true,
  headers: {
    "Contents-Type": "application/json",
    Authorization: "Bearer ",
  },
});

const API_GET = (targetUrl, params, headers) =>
  instance.get(targetUrl, {
    params,
    headers,
  });
  


  
const API_POST = (targetUrl, body) => instance.post(targetUrl, body);

export { API_GET, API_POST };
