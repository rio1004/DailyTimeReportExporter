import axios from "axios";

const requestInstance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 10000,
});

requestInstance.interceptors.request.use(
  (config) => {
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
    const data = res.data
    return data;
  },
  (err) => {
    console.log("this is the errors:", err);
    return Promise.reject(err);
  }
);

export default requestInstance;
