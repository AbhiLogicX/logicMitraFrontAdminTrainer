import { useState } from "react";
import axios from "axios";
import { UsesubcategoriesContext } from "../context/SubcatContext";

const useFetchOnce = (url) => {
  // const {data, setData , error , setError, setLoading, loading,
  // }=UsesubcategoriesContext()

  const [subcatdata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const Fetch = async (id) => {
    //console.log(`${url}${id}`)
    try {
      setLoading(true);
      setError({
        status: false,
        message: "",
      });
      const response = await axios.get(`${url}${id}`); //fetching the data
      //console.log("cosnole ka data " ,response.data.length===0 ? response.data : null)
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError({
        status: true,
        message: error.message,
      });
      setLoading(false);
    }
  };
  return [Fetch, subcatdata, loading, error];
};

export { useFetchOnce };
