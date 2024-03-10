import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import * as settings from "../settings";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginErrors, setLoginErrors] = useState([]);

  useEffect(() => {
    // refresh token if expired
    const storedToken = Cookies.get("token");

    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return axios
      .post(
        `${settings.API_SERVER}/api/accounts/login/`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const token = res.data.access;
        const refreshToken = res.data.refresh;

        Cookies.set("token", token);
        Cookies.set("refreshToken", refreshToken);
        setIsLoggedIn(true);
        setToken(token);
        setRefreshToken(refreshToken);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          let errorList = [];
          if (error.response.data) {
            errorList = Object.keys(error.response.data).map((field) => {
              return { field, message: error.response.data[field] };
            });
          }
          setLoginErrors(errorList);
        } else if (error.request) {
          // The request was made but no response was received
          setLoginErrors([
            "The request was made but no response was received.",
          ]);
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoginErrors(["Error: " + error.message]);
        }
      });
  };

  const logout = () => {
    return axios
      .post(
        `${settings.API_SERVER}/api/accounts/logout/`,
        {
          refresh_token: Cookies.get("refreshToken"),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        setIsLoggedIn(false);
        setToken(null);
        setRefreshToken(null);
      })
      .catch((error) => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        setIsLoggedIn(false);
        setToken(null);
        setRefreshToken(null);
      });
  };

  const authValue = {
    isLoggedIn,
    isLoading,
    token,
    refreshToken,
    loginErrors,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValue} {...props} />;
}

export { AuthContext, AuthProvider };
