import axios, { InternalAxiosRequestConfig } from "axios";

const access_token = localStorage.getItem("access_token");
const axiosClient = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    // Authorization: `Bearer ${access_token}`,
    "content-type": "application/json",
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (config: InternalAxiosRequestConfig<any>) {
    // Do something before request is sent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newConfig: InternalAxiosRequestConfig<any> = config;
    const token =
      localStorage.getItem('access_token') === null ? 'null' : localStorage.getItem('access_token');

    if (token && token !== 'undefined' && token !== 'null') {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
axiosClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
export default axiosClient;
