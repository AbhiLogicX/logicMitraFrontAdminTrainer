import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useUpdate = (updateUrl) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (id, updateData, redirectUrl) => {
    try {
      setLoading(true);
      const res = await axios.put(`${updateUrl}?${id}`, updateData);
      if (res.status === 200) {
        toast.success(res?.data?.message || "Data updated Successfully");
        navigate(redirectUrl);
        return true;
      }
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error("An error occurred");
      return false;
    }
  };

  return [handleUpdate, loading, error];
};

export default useUpdate;
