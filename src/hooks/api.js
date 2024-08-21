import React from 'react'
import axios from 'axios';

const api = () => {


  const api = axios.create({
    baseURL: 'https://uat-icons.com/Quote2supply/api', 
    timeout: 10000,
    headers: {
      'Accept': 'application/json'
    }
  });
  

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('materialsToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
      

      
      
    

}

export default api