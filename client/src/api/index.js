import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signInGoogle = (accessToken) =>
  API.post("/users/signin", {
    googleAccessToken: accessToken,
  });

export const signUpGoogle = (accessToken) =>
  API.post("/users/signup", {
    googleAccessToken: accessToken,
  });
