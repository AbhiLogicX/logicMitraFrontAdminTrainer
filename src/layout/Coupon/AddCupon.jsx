import React, { useEffect, useState } from "react";
import Home from "../../Home";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [fetched, setfetched] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    amount: "",
    course: "",
    visibility: "private",
    type: "",
    description: "",
  });

  const nevigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      const data = await axios
        .get("/courses/all-course")
        .then((res) => {
          // console.log(res.data.data);
          setCourseList(res.data.data);
        })
        .catch((err) => {
          setCourseList([]);
        });
    }
    if (!fetched) {
      fetchCourses();
    }
  }, [fetched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/coupon/add-coupon", formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        nevigate("/coupon");
      }
    } catch (error) {
      toast.error("something went wrong coupon not created");
    }
  };

  return (
    <Home>
      <div className="w-[100%] py-3 sm:p-3 mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium text-white d-flex justify-between items-center">
            <h1>Add Copuon Details</h1>
          </div>
        </section>
        <div>
          <form className="forms-sample m-2 p-4 box" onSubmit={handleSubmit}>
            <div className="w-100 gap-3">
              <div className="form-group row">
                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="name">
                    Coupon Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    name="title"
                    placeholder="Enter Coupon Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="code">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    name="code"
                    placeholder="Enter Coupon Code"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="amount">
                    Amount *
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    name="amount"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-sm-4 flex flex-col">
                  <label className="text-white" htmlFor="course">
                    * Course
                  </label>
                  <div>
                    <select
                      name="course"
                      id="course"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="">
                        For which Course you want the coupon
                      </option>
                      {courseList.map((itm) => (
                        <option key={itm.id} value={itm.id}>
                          {itm.ctitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-sm-4 flex flex-col">
                  <label className="text-white" htmlFor="visibility">
                    * Visibility
                  </label>
                  <div>
                    <select
                      name="visibility"
                      id="visibility"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                      value={formData.visibility}
                      onChange={handleChange}
                    >
                      <option value="private">private</option>
                      <option value="visible">visible</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-sm-4 flex flex-col">
                  <label className="text-white" htmlFor="course">
                    * Type
                  </label>
                  <div>
                    <select
                      name="type"
                      id="type"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Select discount type ...</option>
                      <option value="Percentage">Percentage</option>
                      <option value="Flat">Flat</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-sm-5 flex flex-col mt-1">
                  <label className="text-white" htmlFor="course">
                    * Type
                  </label>
                  <div>
                    <textarea
                      name="description"
                      id="description"
                      type="text"
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="Add-btn rounded-sm py-2 my-2 px-5 sm:px-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Home>
  );
};

export default AddCoupon;
