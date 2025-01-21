import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { CiFilter } from "react-icons/ci";
import { useAuth } from "../../context/auth";

const Enrollment = () => {
  const [auth, setAuth] = useAuth();
  const [params, setParams] = useState({
    studentName: "",
    courseName: "",
    trainerId: auth?.userId ? auth?.userId : auth?.user,
    courseId: "",
    fromDate: "",
    toDate: "",
  });

  const [data, error, loading, reloadData] = useFetch(
    `/enroll/enroll-list?studentName=${params.studentName}&courseName=${params.courseName}&trainerid=${params.trainerId}&courseid=${params.courseId}&fromDate=${params.fromDate}&toDate=${params.toDate}`
  );

  const [dataTrain, errorTrain, loadingTrain, reloadDataTrain] =
    useFetch(`/trainers/list`);
  const [dataCourse, errorCourse, loadingCourse, reloadDataCourse] =
    useFetch(`/courses/all-course`);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });

    reloadData(false);
  };

  const handleSelectChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    reloadData(false);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Home>
        <div className="px-3 text-white w-[100%] mb-16">
          <section className="section mt-1 mb-3">
            <div className="text-xl font-medium d-flex justify-between items-center">
              <h1>Enrollment List</h1>
              <div className="flex items-center">
                {/* <div className="">
                  <Link
                    to="/enrollment/create"
                    className="Add-btn py-2 px-3 rounded-md"
                  >
                    Create Enroll
                  </Link>
                </div> */}
                <button
                  onClick={toggleSidebar}
                  className="ml-3 py-1 px-3 rounded-md flex items-center text-lg border-1"
                >
                  <CiFilter /> Filter
                </button>
              </div>
            </div>
            <div className="box mt-3">
              <div className="row">
                <div className="col-12 col-sm-3  flex flex-col">
                  <label className="text-white" htmlFor="start-date">
                    From Date
                  </label>
                  <input
                    type="date"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                    name="fromDate"
                    id="start-date"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-sm-3  flex flex-col">
                  <label className="text-white" htmlFor="start-date">
                    To Date
                  </label>
                  <input
                    type="date"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                    name="toDate"
                    id="start-date"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-sm-3  flex flex-col">
                  <label className="text-white" htmlFor="start-date">
                    Course
                  </label>
                  <select
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                    name="courseId"
                    id="courseId"
                    onChange={handleSelectChange}
                  >
                    <option value="">Select course ...</option>
                    {dataCourse?.data?.map((ele) => (
                      <option value={ele.id}>{ele.ctitle}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-sm-3  flex flex-col">
                  <label className="text-white" htmlFor="start-date">
                    Trainer
                  </label>
                  <select
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                    name="trainerId"
                    id="trainerId"
                    onChange={handleSelectChange}
                  >
                    <option value="">Select trainer ...</option>
                    {dataTrain?.data?.map((ele) => (
                      <>
                        {ele.sname ? (
                          <option value={ele.id}>{ele.sname}</option>
                        ) : null}
                      </>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <div className="w-[100%]">
            {/* Display loading message while data is being fetched */}
            {/* Display error message if there's an error */}
            {error && <h1 className="text-white">{error.message}</h1>}

            {data?.data && (
              <>
                {/* Sidebar for Filters */}
                <div
                  style={{ backgroundColor: "#013437" }}
                  className={`fixed top-0 right-0 h-full w-1/4 p-6 transition-transform duration-300 border-l-yellow-600 border-solid border-l-2 ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-3">
                    <h4 className="text-white">Filters</h4>
                    <button onClick={toggleSidebar} className="text-white">
                      ✕
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="text-white" htmlFor="search">
                      Search student
                    </label>
                    <input
                      type="search"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      id="search"
                      name="studentName"
                      onChange={handleChange}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white" htmlFor="search">
                      Search Trainer
                    </label>
                    <input
                      type="search"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      id="search"
                      name="trainerName"
                      onChange={handleChange}
                      placeholder="Enter trainer name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white" htmlFor="search">
                      Search Course
                    </label>
                    <input
                      type="search"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      id="search"
                      name="courseName"
                      onChange={handleChange}
                      placeholder="Enter course name"
                    />
                  </div>
                </div>

                <div className=" w-[100%]">
                  <div className=" ">
                    {/* Display loading message while data is being fetched */}
                    {loading && <h1 className="text-white">Loading...</h1>}
                    {/* Display error message if there's an error */}
                    {error && <h1 className="text-white">{error.message}</h1>}
                    {/* Display trainers data if available */}
                    {data?.data?.length !== 0 && (
                      <div className="table-responsive Ttable mt-4   overflow-y-auto Table-overflow">
                        <table className=" table-striped w-[100%]">
                          <thead>
                            <tr className="Thead">
                              <th scope="col">Student Name</th>
                              <th scope="col">Trainer Name</th>
                              <th scope="col">Course Name</th>
                              <th scope="col">Enroll Date</th>
                              <th scope="col">
                                <p>Payment Amount</p>
                                <p className="text-xs">*(subtotal)</p>
                              </th>
                              <th scope="col">Status</th>
                              <th scope="col">Pay Status</th>
                              <th scope="col">Options</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {data.data?.map((item, index) => (
                              <tr key={index} className="Tbody">
                                <td>{item.studentid?.sname}</td>
                                <td>
                                  {item.trainerid?.sname
                                    ? item.trainerid.sname
                                    : "NA"}
                                </td>
                                <td>
                                  {item?.courseid?.ctitle
                                    ? item.courseid.ctitle
                                    : "NA"}
                                </td>
                                <td> {item?.enrolldate.substring(0, 10)}</td>
                                <td> {item?.subtotal} Rs</td>
                                <td>
                                  {" "}
                                  {item?.status === 1 ? "Active" : "in-Active"}
                                </td>
                                <td>
                                  {item?.paystatus === "1" ? "paid" : "pending"}
                                </td>
                                <td className="flex gap-2 items-cente justify-center">
                                  <Link
                                    className="  py-2 px-3 rounded-md view-icon"
                                    to={`/enrollment/view/${item.id}`}
                                  >
                                    <i className="bi bi-eye-fill"></i>
                                  </Link>{" "}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Home>
    </>
  );
};

export default Enrollment;
