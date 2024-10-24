import axios, { AxiosInstance, AxiosResponse } from "axios";

const httpRequest: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com", // Базовый URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик для обработки ответов
httpRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Обработка ошибок
    return Promise.reject(error);
  }
);

export default httpRequest;
