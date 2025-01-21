import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import swal from "sweetalert";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import axios from "axios";
import Home from "../../Home";

function EditTrainerInfo() {
  const TrainerUrl = "/trainers";
  // Extracts student ID from URL parameters
  const { id } = useParams();

  // //console.log(id);
  // Fetch student data using a custom hook (useFetch)

  const [Fetch, data, loading, error] = useFetchOnce(`/user/details?`, true);
  console.log("--->", data);
  // State to store form parameters

  // Updates params when data is fetched
  useEffect(() => {
    Fetch(`userID=${id}`);
  }, []);

  // State to store form parameters
  const [params, setParams] = useState({});
  // //console.log(params);

  const [states, setStates] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [citiesData, setCitiesData] = useState([]);

  // Updates params when data is fetched
  useEffect(() => {
    if (data) {
      setParams(data.data);
    }
  }, [data]);

  // //console.log("------>", params?.sstate);

  const handleChangeState = async (state) => {
    // //console.log("change");

    await axios
      .post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
        country: "India",
        state: state,
      })
      .then((res) => {
        if (res.status === 200) {
          setCitiesData(res.data.data);
        }
      })
      .catch((err) => {
        setCitiesData([]);
      });
  };

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter
    const { name, value, type, files } = e.target;
    if (name === "sstate") {
      handleChangeState(value);
    }
    // console.log(value);
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));

    // console.log("params ---->", params);
  };
  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/user/update-user`);

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    for (const [key, value] of Object.entries(params)) {
      // If the value is a file, append it directly
      if (value instanceof File) {
        formdata.append(key, value);
      } else {
        // Otherwise, append it as a string
        formdata.append(key, value);
      }
    }

    // Calls the handleUpdate function from the custom hook
    handleUpdate(`userId=${e.target.id}`, formdata, TrainerUrl);
  };
  // //console.log(params);

  const [Citydata, error1, loading1] = useFetch("/address/city-list", true);

  const [Countrydata, error2, loading2] = useFetch(
    "/address/country-list",
    true
  );

  const [Statedata, error3, loading3] = useFetch("/address/state-list", true);

  // useEffect(() => {
  //   const fetchcitydata = async () => {
  //     try {
  //       const res = await axios.get(
  //         `/address/city-detail?cityID=${params?.scity}`
  //       );
  //       const data = res.data;
  //       //console.log(data?.data?.state);

  //       const datastate = Statedata?.data?.filter(
  //         (elm) => elm.id === data?.data?.state
  //       );
  //       //console.log(datastate);
  //       const UniquStatename = datastate.map((elm) => elm.title);
  //       //console.log(...UniquStatename);

  //       setParams((predata) => ({
  //         ...predata,
  //         sstate: UniquStatename.toString(),
  //       }));

  //       //console.log(datastate);
  //     } catch (error) {
  //       //console.log(error);
  //     }
  //   };

  //   fetchcitydata();
  // }, [params?.scity]);

  useEffect(() => {
    async function fetchStates() {
      await axios
        .post(`https://countriesnow.space/api/v0.1/countries/states`, {
          country: "india",
        })
        .then((res) => {
          // //console.log("res---->", res);
          setStates(res.data.data.states);
          setFetchedData(true);
        });
    }
    async function setCityList(city) {
      await axios
        .post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
          country: "India",
          state: city,
        })
        .then((res) => {
          if (res.status === 200) {
            setCitiesData(res.data.data);
          } else {
            setCitiesData([]);
          }
        })
        .catch((err) => {
          setCitiesData([]);
        });
    }

    if (!fetchedData && !loading) {
      fetchStates();
    }
    setCityList(params?.sstate);
  }, [fetchedData, loading]);

  // console.log("---->", params);

  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {data?.data && (
          <div className=" py-3 p-3 mb-16">
            <section className="section py-3">
              <div className="text-xl font-medium text-white  d-flex justify-between items-center">
                <h1> Edit Trainer Details</h1>
              </div>
            </section>
            <form
              className="forms-sample w-100  p-4 box"
              onSubmit={handleSubmit}
              id={params?.id}
            >
              <div className="w-100 d-flex gap-3">
                <div className="form-group  row items-center">
                  <div className="col-12 col-sm-4 items-center">
                    <label
                      className="text-white"
                      htmlFor="exampleInputUsername1"
                    >
                      Trainer Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sname"
                      defaultValue={params?.sname}
                      placeholder="Trainers Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label
                      className="text-white"
                      htmlFor="exampleInputUsername1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="semail"
                      defaultValue={params?.semail}
                      placeholder="Trainers Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Gender *
                    </label>

                    <select
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      value={params?.sgender}
                      name="sgender"
                      required
                      onChange={handleChange}
                    >
                      <option>Select gender</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputMobile">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      minLength={10}
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                      defaultValue={params?.smobile}
                      name="smobile"
                      placeholder="Mobile no."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Whatsapp
                    </label>
                    <input
                      type="tel"
                      placeholder="Whatsapp no."
                      maxLength={10}
                      minLength={10}
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="swhatsapp"
                      defaultValue={params?.swhatsapp}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputMobile">
                      Date Of Birth *
                    </label>
                    <input
                      type="date"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sdob"
                      defaultValue={params?.sdob}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Country *
                    </label>

                    <select
                      required
                      className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                      onChange={handleChange}
                      name="scountry"
                      value={params?.scountry}
                    >
                      <option> select country</option>
                      {Countrydata?.data?.map((elm) => {
                        return (
                          <>
                            <option value={elm.title}> {elm.title} </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      State *
                    </label>

                    <select
                      required
                      className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                      onChange={handleChange}
                      name="sstate"
                      value={params?.sstate}
                    >
                      <option> select state</option>
                      {states?.map((elm) => {
                        return (
                          <>
                            <option value={elm.name}> {elm.name} </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      City *
                    </label>

                    <select
                      required
                      className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                      onChange={handleChange}
                      name="scity"
                      value={params?.scity}
                    >
                      <option> select city</option>
                      {citiesData.map((elm) => {
                        return (
                          <>
                            <option value={elm}> {elm} </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputMobile">
                      Address *
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="saddress"
                      defaultValue={params?.saddress}
                      placeholder="Address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Pin code *
                    </label>
                    <input
                      type="number"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="spincode"
                      defaultValue={params?.spincode}
                      placeholder="Pincode"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Level Of Education *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="levelOfeducation"
                      defaultValue={params?.levelOfeducation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Experince
                    </label>
                    <input
                      type="number"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="experience"
                      defaultValue={params?.experience}
                      placeholder="Experince"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Pass Out Year *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="passOutYear"
                      defaultValue={params?.passOutYear}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Profile Pic
                    </label>
                    <input
                      type="file"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sprofilepicUrl"
                      placeholder="picture"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Banner
                    </label>
                    <input
                      type="file"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sbackgroundUrl"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Status
                    </label>
                    <select
                      onChange={handleChange}
                      value={params?.status}
                      name="status"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                    >
                      <option>Select option</option>

                      <option value={1}>Active</option>
                      <option value="blocked">Blocked</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>

                  {/* <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Featured
                    </label>
                    <select
                      onChange={handleChange}
                      defaultValue={params?.featured}
                      name="featured"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                    >
                      <option value="">Select option...</option>

                      <option value={true}>Featured</option>
                      <option value={false}>Not-Featured</option>
                    </select>
                  </div> */}
                  {/* <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Lattitude
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="slattitude"
                      defaultValue={params?.slattitude}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Longitude
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="slongitude"
                      defaultValue={params?.slongitude}
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Rating{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="srating"
                      defaultValue={params?.srating}
                      onChange={handleChange}
                    />
                  </div> */}

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Populer
                    </label>
                    <select
                      onChange={handleChange}
                      value={params?.isPopuler}
                      name="isPopuler"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                    >
                      <option>Select option</option>

                      <option value={true}>Popular</option>
                      <option value={false}>Not Popular</option>
                    </select>
                  </div>

                  <div className="col-12 ">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      About
                    </label>
                    <textarea
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sabout"
                      placeholder="About"
                      defaultValue={params?.sabout}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 ">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Intro
                    </label>
                    <textarea
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sintro"
                      placeholder="Intro"
                      defaultValue={params?.sintro}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Submit and cancel buttons */}
              <div className="flex items-center justify-between mt-3">
                <button
                  type="submit"
                  className="sm:px-4  px-5 py-2 Add-btn rounded-md"
                >
                  Update
                </button>
                <Link to="/trainers">
                  <button
                    type="reset"
                    className=" py-2 Cancel-btn sm:px-4  px-5 rounded-md"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </Home>
    </>
  );
}

export default EditTrainerInfo;
