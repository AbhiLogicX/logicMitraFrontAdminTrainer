import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { properties } from "../config/properties";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("admin"))?.user,
    token: JSON.parse(localStorage.getItem("admin"))?.token,
  });

  // console.log("auth on reload");
  const data = localStorage.getItem("admin");
  // console.log("data----->", data);
  const user = JSON.parse(data);
  // console.log("user----->", user);

  axios.defaults.baseURL = `${properties.URLS.BASE_URL_DEV}/api/`;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    if (data) {
      setAuth({
        ...auth,
        user: user.userId,
        token: user.token,
      });
    }
  }, [data]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
