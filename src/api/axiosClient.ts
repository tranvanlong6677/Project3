import axios, { InternalAxiosRequestConfig } from "axios";

const access_token = localStorage.getItem("access_token");
const axiosClient = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "content-type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function (config: InternalAxiosRequestConfig<any>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newConfig: InternalAxiosRequestConfig<any> = config;
    const token =
      localStorage.getItem("access_token") === null
        ? "null"
        : localStorage.getItem("access_token");

    // if (token && token !== "undefined" && token !== "null") {
    //   if (isAccessTokenExpired(token)) {
    //     console.log(1);
    //     const { result } = await refreshToken();
    //     const newAccessToken = result.access_token;
    //     newConfig.headers.Authorization = `Bearer ${newAccessToken}`;
    //   } else {
    //     console.log(2);
    //     newConfig.headers.Authorization = `Bearer ${token}`;
    //   }
    // }
    if (token && token !== "undefined" && token !== "null") {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.log("hihi", error);
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
axiosClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
export default axiosClient;
