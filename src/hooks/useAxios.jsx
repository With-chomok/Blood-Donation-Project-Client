import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: "https://projects-backend-side-11.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
