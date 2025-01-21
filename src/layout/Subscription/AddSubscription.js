import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";

function AddSubscription() {
  const SubscriptionUrl = "/subscription";
  const [fetchedData, setFetchedData] = useState(false);
  const [cityDataList, setCityDataList] = useState([]);
  const [params, setParams] = useState({
    city: "",
    position: "",
    fees: "",
    status: "1",
    duration: 0,
    package: "",
    category: "",
    subCategory: "",
  });
  const nav = useNavigate();
  const { id } = useParams();
  const catId = id;
  // //console.log(id);

  // Fetch category data using a custom hook (useFetch)

  //   const [data, error, loading] = useFetch(
  //     `/subscription/detail-subscription?subId=${catId}`,
  //     true
  //   );

  const [stateData, stateError, stateLoading] = useFetch(
    `/address/state-list`,
    true
  );
  const [cityData, cityError, cityLoading, citySetReload] = useFetch(
    `/address/city-list?state=${params?.state}`,
    true
  );

  const [categeoryList, cateListErr, cateLoading, cateReload] = useFetch(
    "/categories/list",
    true
  );
  const [subCategeoryList, subCateListErr, subCateLoading, subCateReload] =
    useFetch(`/categories/sub-cat?catg=${params?.category}`);

  //   console.log("---sttt", categeoryList);

  //   console.log("--->", subCategeoryList);

  // State to store form parameters

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter

    const { name, value, type, files } = e.target;

    if (name === "state") {
      setParams((prevParams) => ({
        ...prevParams,
        [name]: type === "file" ? files[0] : value,
      }));
      citySetReload(false);
    }

    if (name === "category") {
      //   console.log("--hllll");
      setParams((prevParams) => ({
        ...prevParams,
        [name]: type === "file" ? files[0] : value,
      }));
      subCateReload(false);
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  // //console.log(params);

  // http://api/subscription/update-subscription?subId=
  // Uses a custom hook (useUpdate) for handling the update API call
  // const [handleUpdate] = useUpdate(`/subscription/update-subscription`);

  // //console.log(params);
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // //console.log("params ----->", params);
    // Calls the handleUpdate function from the custom hook
    // handleUpdate(`subId=${e.target.id}`, params, SubscriptionUrl);
    await axios
      .put(`subscription/update-subscription?subId=${e.target.id}`, params)
      .then((res) => {
        if (res.status === 200) {
          nav(SubscriptionUrl);
        }
      })
      .catch((err) => {
        toast.error("Error occurred plan not updated");
      });
  };

  //* city lists data
  // const [CityList, error1, loading1] = useFetch("/address/city-list", true);

  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {/* {loading && <h1 className="text-white">Loading...</h1>} */}
        {/* Display error message if there's an error */}
        {/* {error && <h1 className="text-white">{error.message}</h1>} */}
        {/* Display trainers data if available */}
        {
          <div className="w-[100%] py-3 p-3 mb-16">
            <section className="section py-3">
              <div className="text-xl font-medium text-white  d-flex justify-between items-center">
                <h1> Add Subscription</h1>
              </div>
            </section>
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
                    <div className=" grid grid-cols-1  sm:grid-cols-3 gap-3 w-[100%] md:w-[100%] ">
                      {/* <div className=" ">
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
                          value={params?.city}
                          name="city"
                          placeholder="title"
                          onChange={handleChange}
                        />
                      </div> */}

                      <div className="">
                        <label className="text-white">Select State</label>
                        <select
                          required
                          className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                          onChange={handleChange}
                          name="state"
                        >
                          <option>Select state ...</option>
                          {stateData?.data?.map((elm) => {
                            return (
                              <>
                                <option value={elm.name}>
                                  {" "}
                                  {elm.name}
                                  {"  "}({elm.state_code})
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>

                      <div className="">
                        <label className="text-white">City Name</label>
                        <select
                          required
                          className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                          onChange={handleChange}
                          name="city"
                        >
                          <option> select city</option>
                          {cityData?.data?.map((elm) => {
                            return (
                              <>
                                <option value={elm}> {elm} </option>
                              </>
                            );
                          })}
                        </select>
                      </div>

                      <div className="">
                        <label className="text-white">Category</label>
                        <select
                          required
                          className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                          onChange={handleChange}
                          name="category"
                        >
                          <option value="">Select Category...</option>

                          {categeoryList?.data?.map((itm) => (
                            <option value={itm.id}>{itm.title}</option>
                          ))}
                        </select>
                      </div>

                      {subCateLoading ? null : (
                        <div className="">
                          <p className="text-white">Sub-Category</p>
                          <select
                            required
                            className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                            onChange={handleChange}
                            name="subCategory"
                          >
                            <option value="">Select Sub Category...</option>
                            {subCategeoryList?.data?.map((itm) => (
                              <option value={itm.id}>{itm.title}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="">
                        <p className="text-white">Duration (in months)</p>
                        <input
                          onChange={handleChange}
                          required
                          name="duration"
                          placeholder="Duration in months"
                          type="number"
                          className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                        />
                      </div>

                      <div className="mt-1.5">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Position
                        </label>
                        <input
                          type="text"
                          className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                          name="position"
                          placeholder="Set position..."
                          onChange={handleChange}
                        />
                      </div>

                      <div className="">
                        <p className="text-white">Amount</p>
                        <input
                          onChange={handleChange}
                          required
                          name="fees"
                          value={params?.fees}
                          placeholder="Amount"
                          type="number"
                          className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                        />
                      </div>

                      <div className="col-12 col-sm-4 ">
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
                  className="submit Add-btn mr-2  rounded-md sm:px-4 px-5 py-2"
                >
                  Add
                </button>
                <Link to={"/subscription"}>
                  <button
                    type="reset"
                    className="Cancel-btn  rounded-md sm:px-4 px-5 py-2"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        }
      </Home>
    </>
  );
}

export default AddSubscription;
