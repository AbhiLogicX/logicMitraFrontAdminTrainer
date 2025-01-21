import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "./useDebounce";

const useFetch = (url, params) => {
  // //console.log("query fired")
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const debouncedParams = useDebounce(params, 1000); //using debounce to add delay in api calls
  useEffect(() => {
    async function fetchData() {
      // console.log("url", url, params);
      setLoading(true);
      setError(false);
      setData([]);
      await axios
        .get(url, params)
        .then((res) => {
          //fetching the data
          if (res.status === 200) {
            // console.log("---->", res);
            setData(res.data);
            setLoading(false);
            setReload(true);
          } else {
            setError({
              status: true,
              message: res?.message || "Error in fething data",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          setError({
            status: true,
            message: err.message,
          });
          setLoading(false);
        });
    }
    if (!reload) {
      fetchData();
    }
  }, [debouncedParams, reload]);
  return [data, error, loading, setReload];
};
export { useFetch };
