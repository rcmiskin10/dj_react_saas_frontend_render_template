import axios from "axios";
import Cookies from "js-cookie";
import * as settings from "../settings";

const api = axios.create({
  baseURL: `${settings.API_SERVER}/api`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    // Access Token was expired
    let refreshTokenError, res;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      [refreshTokenError, res] = await axios
        .post(`${settings.API_SERVER}/api/accounts/login/refresh/`, {
          refresh: Cookies.get("refreshToken"),
        })
        .then(async (response) => {
          //handle success
          const { access } = response.data;
          Cookies.set("token", access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return [null, await axios.request(originalRequest)];
        })
        .catch(function (error) {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
        });

      if (refreshTokenError) {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshTokenError);
      }

      return Promise.resolve(res);
    }
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default api;
