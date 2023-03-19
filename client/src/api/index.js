import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user_info")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("user_info").token
    )}`;
  }

  return req;
});

export const signInGoogle = (accessToken) =>
  API.post("/users/signin", {
    googleAccessToken: accessToken,
  });

export const signUpGoogle = (accessToken) =>
  API.post("/users/signup", {
    googleAccessToken: accessToken,
  });
