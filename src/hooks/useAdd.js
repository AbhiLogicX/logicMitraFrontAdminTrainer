import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAdd = (url) => {
  const navigate = useNavigate();
  const addData = async (params, redirecturl, setReload) => {
    //console.log("SetReloa ---->", setReload);
    try {
      await axios
        .post(url, params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.data?.message || "Data Created successfully");
            if (redirecturl !== "") {
              navigate(redirecturl);
            } else {
              setReload(false);
            }
          } else {
            toast.error(res?.data?.message || "Failed Data");
          }
        }); //Adding the data
    } catch (error) {
      toast.error("Error Occurred");
    }
  };
  return [addData];
};
export { useAdd };
