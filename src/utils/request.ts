import axios from "axios";

const requestInstance = axios.create({
  baseURL: "https://dtr-be.vercel.app/",
  timeout: 10000,
});

requestInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Sent:", config);
    return config;
  },
  (error) => {
    console.log("This is Error:", error);
    return Promise.reject(error);
  }
);

requestInstance.interceptors.response.use(
  (res) => {
    console.log("This is the Response:", res);
    const data = res;
    return data;
  },
  (err) => {
    console.log("this is the errors:", err);
    return err.response;
  }
);

export default requestInstance;
