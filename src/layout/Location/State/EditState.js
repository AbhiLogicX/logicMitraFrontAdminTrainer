import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useFetch } from "../../../hooks/useFetch";
import useUpdate from "../../../hooks/useUpdate";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../../Home";

function EditLocationState() {
  const navigate = useNavigate();
  const StateUrl = "/state";

  const { id } = useParams();

  // Fetch category data using a custom hook (useFetch)

  const [data, error, loading] = useFetch(
    `/address/state-detail?stateID=${id}`,
    id
  );

  // State to store form parameters
  const [params, setParams] = useState({});

  //console.log(params);
  // Updates params when data is fetched
  useEffect(() => {
    if (data) {
      setParams(data.data);
    }
  }, [data, loading, error]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter

    const { name, value, type, files } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/address/update-state`);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(params);
    // Calls the handleUpdate function from the custom hook
    try {
      const res = await axios.put(
        `/address/update-state?addId=${e.target.id}`,
        params
      );
      //console.log(await res.data);
      if (res.status === 200) {
        toast.success(res?.data?.message || "Data updated Successfully");
        navigate(StateUrl);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      //console.log(error);
      toast.error("An error occurred");
    }

    // Calls the handleUpdate function from the custom hook
    // handleUpdate(`addId=${e.target.id}`, params , StateUrl);
  };

  // Fetch category data using a custom hook (useFetch)
  const [Coutrylist, error1, loading1] = useFetch(
    "/address/country-list",
    true
  );

  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {data.data && (
          <div className="w-[100%] py-3 p-3  mb-16">
            <form
              // Form for updating category information
              className="forms-sample w-100 m-2 p-4 box"
              onSubmit={handleSubmit}
              id={params?.id}
            >
              {/* Form inputs for category details */}
              <div className="w-100 ">
                {/* Form group for title */}
                <div className="form-group">
                  <div className="flex flex-col-reverse md:flex-row md:flex items-center justify-between ">
                    <div className=" grid grid-cols-1  sm:grid-cols-2 gap-5 w-[100%] items-center">
                      <div className=" ">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                          value={params?.title}
                          name="title"
                          placeholder="title"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="">
                        <label className="text-white">Country</label>
                        <select
                          required
                          className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                          onChange={handleChange}
                          name="country"
                          value={params?.country}
                        >
                          <option> select country</option>
                          {Coutrylist?.data?.map((elm) => {
                            return (
                              <>
                                <option value={elm.id}> {elm.title} </option>
                              </>
                            );
                          })}
                        </select>
                      </div>

                      <div className=" ">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Sequence
                        </label>
                        <input
                          type="text"
                          className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                          value={params?.sequence}
                          name="sequence"
                          placeholder="sequence"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Status
                        </label>

                        <div className="text-white d-flex gap-2">
                          <input
                            type="radio"
                            id="active"
                            name="status"
                            value={1}
                            checked={params?.status == 1}
                            onChange={handleChange}
                          />
                          Active
                          <input
                            type="radio"
                            id="active"
                            name="status"
                            value={0}
                            checked={params?.status == 0}
                            onChange={handleChange}
                          />
                          Inactive
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit and cancel buttons */}

              <div className=" flex items-center my-4 justify-between">
                <button
                  type="submit"
                  className="submit Add-btn mr-2  rounded-md  sm:px-4 px-5 py-2"
                >
                  Update
                </button>
                <button
                  type="reset"
                  className="Cancel-btn  rounded-md  sm:px-4 px-5 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Home>
    </>
  );
}

export default EditLocationState;
