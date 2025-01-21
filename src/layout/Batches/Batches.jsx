import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../context/auth";
// import BatchesDetails from "./BatchesDetails";
import Home from "../../Home";
import { convertToDDMMMYYYY } from "../../util/helper";

const Batches = () => {
  const [auth, setAuth] = useAuth();
  const [params, setParams] = useState({
    trainerId: "",
    courseId: "",
  });

  const [data, error, loading, setReload] = useFetch(
    `/batches/user-batchs?userId=${auth?.userId ? auth?.userId : auth?.user}`
  );

  const [Delete] = useDelete(`/batches/delete-batch?batchId=`);
  const handleDelete = async (e) => {
    //console.log("cate id is ", e.target.id);
    Delete(e.target.id, setReload);
  };

  const [dataTrain, errorTrain, loadingTrain, reloadDataTrain] =
    useFetch(`/trainers/list`);
  const [dataCourse, errorCourse, loadingCourse, reloadDataCourse] =
    useFetch(`/courses/all-course`);

  //console.log(data);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setReload(false);
  };

  return (
    <>
      <Home>
        <div className="px-3 text-white w-[100%]  relative courses-page">
          <section className="section mt-1">
            <div className="text-xl font-medium d-flex justify-between items-center">
              <h1>Batches Lists</h1>
              <div className="">
                <Link
                  to="/batches/create"
                  className="Add-btn px-3 py-2 rounded-md  me-2"
                >
                  Create Batches
                </Link>
              </div>
            </div>
            <div className="row box mt-3 mx-1">
              <div className="col-12 col-sm-3  flex flex-col">
                <label className="text-white" htmlFor="start-date">
                  Course
                </label>
                <select
                  className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                  name="courseId"
                  id="courseId"
                  onClick={handleChange}
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
                  onClick={handleChange}
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
          </section>

          <div className="w-[100%]">
            {error && <h1 className="text-white">{error.message}</h1>}
            {data?.data && (
              <>
                <div className="row ">
                  {/* <Card title="Total Courses" value={totalCourses} />
          <Card title="Active Courses" value={activeCourses} />
          <Card title="Inactive Courses" value={inactiveCourses} />
          <Card title="Blocked Courses" value={blockedCourses} /> */}
                </div>
                {/* <div className="row">
                  <div className="col">
                    <div className="box">
                      <div className="card-body row">
                        <div className="border-bottom mb-3 border-black">
                          <h4 className="text-white heading">Filters</h4>
                        </div>
                        <div className="col-12 col-sm-3 text-white relative ">
                          <label className="text-white" htmlFor="search">
                            Search
                          </label>
                          <input
                            type="search"
                            className="form-control input focus-within:bg-none border-none outline-none focus:bg-none fs-6  w-[100%] w-100 text-white"
                            id="search"
                            name="name"
                            // onChange={handleChange}
                            aria-describedby="emailHelp"
                            placeholder="search"
                          />
                        </div>
                        <div className="col-12 col-sm-3 text-white">
                          <label className="text-white" htmlFor="start-date">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="form-control input focus-within:bg-none border-none outline-none focus:bg-none "
                            name="startDate"
                            id="start-date"
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 col-sm-3 text-white">
                          <label className="text-white" htmlFor="end-date">
                            End Date
                          </label>
                          <input
                            type="date"
                            className="form-control input focus-within:bg-none border-none outline-none focus:bg-none "
                            id="endDate"
                            placeholder=""
                            // onChange={handleChange}
                            name="end-date"
                          />
                        </div>
                        <div className="col-12 col-sm-3 text-white">
                          <label className="text-white" htmlFor="filters">
                            Filters
                          </label>
                          <select
                            id="filters"
                            className="form-select py-2 input focus-within:bg-none border-none outline-none focus:bg-none"
                            // value={params.filter}
                            // onChange={handleChange}
                            name="filter"
                            aria-label=""
                          >
                            <option className="h-100">
                              Open this select menu
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="w-[100%]">
                  <div className="">
                    {loading && <h1 className="text-white">Loading...</h1>}
                    {error && <h1 className="text-white">{error.message}</h1>}
                    {data?.data && (
                      <div className="table-responsive Ttable mt-4   overflow-y-auto Table-overflow">
                        <table className=" table-striped w-[100%]">
                          <thead>
                            <tr className="Thead">
                              <th scope="col">Title</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">Batch Timings</th>
                              <th scope="col">Batch Seats</th>
                              <th scope="col">Status</th>
                              <th scope="col">Enroll Student</th>
                              <th scope="col">Trainer</th>
                              <th scope="col">Course</th>
                              <th scope="col">Options</th>
                              <th scope="col">Manage students</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {data?.data?.batches?.map((item) => (
                              <tr key={item.id} className="Tbody">
                                <td>{item.btitle}</td>
                                <td>{convertToDDMMMYYYY(item?.bstartdate)}</td>
                                <td>
                                  {item?.btime} - {item?.bendTime}
                                </td>
                                <td> {item?.bseats}</td>
                                <td>
                                  {item.bstatus === 0
                                    ? "Upcoming"
                                    : item.bstatus === 1
                                    ? "runing"
                                    : item.bstatus === 2
                                    ? "completed"
                                    : "cancelled"}
                                </td>
                                <td> {item?.student?.length}</td>
                                <td> {item?.btrainer?.sname}</td>
                                <td>{item?.bcourse?.ctitle}</td>
                                <td className="flex gap-2 items-cente justify-center">
                                  <Link
                                    className="  py-2 px-3 rounded-md view-icon"
                                    to={`/batches/view/${item.id}`}
                                  >
                                    <i className="bi bi-eye-fill"></i>
                                  </Link>{" "}
                                  <Link
                                    className=" py-2 px-3 rounded-md edit-icon"
                                    to={`/batches/edit/${item._id}`}
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link>
                                  <Link
                                    className="  py-2 px-3 rounded-md delete-icon "
                                    onClick={handleDelete}
                                    id={item._id}
                                  >
                                    <i
                                      id={item._id}
                                      className="bi bi-trash3"
                                    ></i>
                                  </Link>{" "}
                                </td>
                                <td className="">
                                  <button className="flex flex-row w-[100%]">
                                    <Link
                                      className="  py-2 px-3 text-sm rounded-md view-icon"
                                      to={`/batches/add-student/${item._id}`}
                                      id={item._id}
                                    >
                                      Manage students
                                    </Link>
                                  </button>
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
export default Batches;
