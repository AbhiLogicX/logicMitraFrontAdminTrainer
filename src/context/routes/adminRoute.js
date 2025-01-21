import React from "react";
import { useState } from "react";
// import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth";
import CircleLoader from "../../components/CircularLoader/CircleLoader";
import { properties } from "../../config/properties";

const AdminRoute = () => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      await axios
        .get(`${properties.URLS.BASE_URL_DEV}/api/user/admin-auth`)
        .then((res) => {
          // console.log("admin res ----> ", res);
          if (res.data.response === "success" && res.status === 200) {
            setOk(true);
          } else {
            //console.log("admin res err", res);
            setOk(false);
            navigate("/login");
          }
        })
        .catch((err) => {
          setOk(false);
          navigate("/login");
        });
    };
    if (auth.user !== null && auth.token !== "") {
      authCheck();
    } else {
      localStorage.removeItem("admin");
      navigate("/login");
    }
  }, [auth]);
  return ok ? <Outlet /> : <CircleLoader />;
};

export default AdminRoute;
