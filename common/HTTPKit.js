import axios from "axios";

export let request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const HTTPKit = {
  get: (url, options) => {
    return request.get(url, options);
  },
  post: (url, payload) => {
    return request.post(url, payload);
  },
  put: (url, payload) => {
    return request.put(url, payload);
  },
  patch: (url, payload) => {
    return request.patch(url, payload);
  },
  delete: (url) => {
    return request.delete(url);
  },
};

export default HTTPKit;
