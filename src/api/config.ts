import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_UPLOAD_IMAGE as string,
  headers: {
    "content-type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    return config;
  },
  function (error) {
    // Do something with request error
    return error.response;
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response;
  }
);
export default axiosClient;
