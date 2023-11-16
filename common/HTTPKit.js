import axios from "axios";

// Creating axios instance to set the base url by ENV file and settings json as the content type
export let request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Defining all the different operations I wanna perform and which will they take as input and do as output
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
