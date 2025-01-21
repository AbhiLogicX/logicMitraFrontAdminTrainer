import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { useAdd } from "../../hooks/useAdd";
import Home from "../../Home";

const CreateBatches = () => {
  const [courData, setCourData] = useState([]);
  const [data, error, loading] = useFetch(`/user/list?userType=trainer`);
  const [params, setParams] = useState({
    btitle: "",
    bstartdate: "",
    bimage: "",
    btime: "",
    bseats: "",
    bsequence: "",
    bstatus: 1,
    btrainer: "",
    bcourse: "",
    meetLink: "",
    bendTime: "",
  });
  //console.log(params);

  const handleChange = async (e) => {
    //console.log(e.target);
    const { name, value, type, files } = e.target;
    setParams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });

    if (name === "btrainer") {
      try {
        const data1 = await axios.get(
          `/courses/trainer-courses?trainId=${value}`
        );
        setCourData(data1?.data?.data?.courses);
      } catch (error) {
        //console.log(error);
      }
    }
  };
  const [addData] = useAdd(`batches/create-batch`);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", params.bimage);
    e.preventDefault();
    addData(params, "/batches");
  };
  //console.log(courData);
  //console.log(data);
  return (
    <Home>
      <div className="w-[100%] py-3 sm:p-3">
        <section className="section px-2 mb-2">
          <div className="text-xl font-medium">
            <h1 className="heading text-white">Create batch</h1>
          </div>
        </section>

        <form
          // Form for Adding Course information
          className="forms-sample  m-2 p-4 box "
          onSubmit={handleSubmit}
        >
          {/* Form inputs for course details */}
          <div className="w-100  gap-3">
            {/* Form group for coursename*/}
            <div className="form-group  row">
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Batch Title
                </label>
                <input
                  type="text"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={params?.btitle}
                  name="btitle"
                  placeholder="Batch Title"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="subcategory">
                  Batch Trainer
                </label>

                <div>
                  <select
                    name="btrainer"
                    value={params.btrainer}
                    onChange={handleChange}
                    id="btrainer"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  >
                    <option selected>Open this select menu</option>
                    {data?.data &&
                      data?.data?.map((elm) => {
                        // const { _id, title } = elm.csubcategory;
                        // //console.log(_id, title);

                        return (
                          <>
                            <option value={elm.id}>{elm?.sname}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={params?.bstartdate}
                  name="bstartdate"
                  placeholder="Start date"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Batch Start Time
                </label>
                <input
                  type="time"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={params?.btime}
                  name="btime"
                  placeholder="Batch time"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Batch End Time
                </label>
                <input
                  type="time"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={params?.bendTime}
                  name="bendTime"
                  placeholder="Batch time"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Batch Seats
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={params?.bseats}
                  name="bseats"
                  placeholder="Batch seats"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="ctrainer">
                  Batch Course
                </label>

                <div>
                  <select
                    name="bcourse"
                    value={params?.bcourse}
                    onChange={handleChange}
                    id="bcourse"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-2"
                  >
                    <option selected>Open this select menu</option>
                    {courData &&
                      courData?.map((elm) => {
                        // const { _id, sname } = elm.ctrainer;
                        // //console.log(_id, sname);
                        return (
                          <>
                            <option value={elm._id}>{elm.ctitle}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Batch Meet Link *
                </label>
                <input
                  type="text"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="meetLink"
                  placeholder="Enter Meeting Link"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Batch Image
                </label>
                <input
                  type="file"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="bimage"
                  placeholder="Image File"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Sequence
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="bsequence"
                  value={params?.bsequence}
                  placeholder="Batch Sequence"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white">Status</label>

                <div className="d-flex justify-content-start text-white gap-4 align-items-center my-2">
                  <div className=" ">
                    <input
                      type="radio"
                      id="active"
                      name="bstatus"
                      value={0}
                      onChange={handleChange}
                    />
                    upcomming
                  </div>

                  <div className="">
                    <input
                      type="radio"
                      id="inactive"
                      value={1}
                      name="bstatus"
                      onChange={handleChange}
                    />
                    running
                  </div>
                </div>
              </div>
            </div>

            {/* Submit and cancel buttons */}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="Add-btn rounded-sm py-2 my-2  px-5"
              >
                Submit
              </button>
              <button
                type="reset"
                className="Cancel-btn  py-2  rounded-sm my-2 px-5"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Home>
  );
};

export default CreateBatches;
