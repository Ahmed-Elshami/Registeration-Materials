import axios from 'axios';
import React from 'react'


const axiosInstance =axios.create({
    baseURL: "https://uat-icons.com/Quote2supply/api/",
    headers: {
      "Content-Type": "application/json, multipart/form-data",
      "Accept-Language": "en"
    }
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("materialsToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance