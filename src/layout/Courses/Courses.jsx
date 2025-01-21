import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useDelete } from "../../hooks/useDelete";
import { UsesubcategoriesContext } from "../../context/SubcatContext";
import Home from "../../Home";
import { CiFilter } from "react-icons/ci";
import { useAuth } from "../../context/auth";

function Courses() {
  const [auth, setAuth] = useAuth();

  const [params, setParams] = useState({
    name: "",
    startDate: "",
    endDate: "",
    filter: "",
  });

  const [data, error, loading, setReload] = useFetch(
    `/courses/trainer-courses?trainId=${
      auth?.userId ? auth?.userId : auth?.user
    }`,
    true
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { courseId, setCourseId, trainerId, setTrainerId } =
    UsesubcategoriesContext();

  // Handle changes in filter inputs
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    // //console.log(params);
    setReload(false);
  };

  //open subModeule of course

  //setting student categories count
  const [totalCourses, setTotalCourses] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [inactiveCourses, setInactiveCourses] = useState(0);
  const [blockedCourses, setBlockedCourses] = useState(0);
  useEffect(() => {
    setTotalCourses(0);
    setBlockedCourses(0);
    setInactiveCourses(0);
    setActiveCourses(0);
    data?.data?.courses?.map((item) => {
      setTotalCourses((prevTotal) => prevTotal + 1);
      if (item.status === "blocked") {
        setBlockedCourses((blockedCourses) => blockedCourses + 1);
      } else if (item.status === "1") {
        setActiveCourses((activeCourses) => activeCourses + 1);
      } else if (item.status === "0") {
        setInactiveCourses((inactiveCourses) => inactiveCourses + 1);
      }
    });
  }, [data]);

  // delete the particular Courses
  const [Delete] = useDelete(`/courses/delete-course?courseId=`);

  const handleDelete = async (e) => {
    //console.log("course id is", e.target.id);

    Delete(e.target.id, setReload);
  };

  //console.log(data);
  return (
    <>
      <Home>
        <div className="md:pl-3 px-3 text-white w-[100%] mb-16">
          <section className="section mb-3 mt-1">
            <div className="text-xl font-medium d-flex justify-between items-center">
              <h1>Courses List</h1>
              <div className="flex items-center">
                <div className="">
                  <Link
                    to="/courses/add"
                    className="Add-btn py-2 px-3 rounded-md"
                  >
                    Add Courses
                  </Link>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="ml-3 py-1 px-3 rounded-md flex items-center text-lg border-1"
                >
                  <CiFilter /> Filter
                </button>
              </div>
            </div>
          </section>

          <div className=" ">
            {loading && <h1 className="text-white">Loading...</h1>}
            {error && <h1 className="text-white">{error.message}</h1>}
            {!data?.data?.courses == [] && (
              <>
                <div className="row ">
                  <Card title="Total Courses" value={totalCourses} />
                  <Card title="Active Courses" value={activeCourses} />
                  <Card title="Inactive Courses" value={inactiveCourses} />
                  <Card title="Blocked Courses" value={blockedCourses} />
                </div>

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
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      id="search"
                      name="name"
                      onChange={handleChange}
                      placeholder="Search"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white" htmlFor="start-date">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      name="startDate"
                      id="start-date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white" htmlFor="end-date">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      id="end-date"
                      onChange={handleChange}
                      name="endDate"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white" htmlFor="filters">
                      Filter By
                    </label>
                    <select
                      id="filters"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      value={params.filter}
                      onChange={handleChange}
                      name="filter"
                    >
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>

                <div className=" w-[100%]">
                  <div className=" ">
                    {loading && <h1 className="text-white">Loading...</h1>}
                    {error && <h1 className="text-white">{error.message}</h1>}
                    {data?.data && (
                      <div
                        className="table-responsive Ttable mt-4  overflow-y-auto Table-overflow"
                        style={{ maxHeight: "720px", overflowY: "auto" }}
                      >
                        <table className=" table-striped w-[100%]">
                          <thead>
                            <tr className="Thead">
                              <th scope="col">Title</th>
                              <th scope="col">Category</th>
                              <th scope="col">Subcategory</th>
                              <th scope="col">Trainer</th>
                              <th scope="col">Rating</th>
                              <th scope="col">No of Enrollment</th>
                              <th scope="col">Offer Fees</th>
                              <th scope="col">Duration</th>

                              <th scope="col">Options</th>
                              <th scope="col">Add Module</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {data?.data?.courses?.map((item) => (
                              <tr key={item.id} className="Tbody">
                                <td>{item.ctitle}</td>
                                <td>
                                  {item?.ccategory?.title == null
                                    ? "NA"
                                    : item?.ccategory?.title}
                                </td>
                                <td>
                                  {" "}
                                  {item?.csubcategory?.title == null
                                    ? "NA"
                                    : item?.csubcategory?.title}
                                </td>
                                <td>
                                  {" "}
                                  {item?.ctrainer?.sname == null
                                    ? "NA"
                                    : item?.ctrainer?.sname}
                                </td>
                                <td> {item.ratings}</td>
                                <td> {item.enrollStudent?.length}</td>
                                <td> {item.cofferfees}</td>
                                <td>{item.cduration}</td>

                                <td className="flex gap-2 items-cente justify-center">
                                  <Link
                                    className="  py-2 px-3 rounded-md view-icon"
                                    to={`/courses/view/${item.id}`}
                                  >
                                    <i className="bi bi-eye-fill"></i>
                                  </Link>{" "}
                                  <Link
                                    className=" py-2 px-3 rounded-md edit-icon"
                                    to={`/courses/edit/${item.id}`}
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link>
                                  <Link
                                    className="  py-2 px-3 rounded-md delete-icon "
                                    onClick={handleDelete}
                                    id={item.id}
                                  >
                                    <i
                                      id={item.id}
                                      className="bi bi-trash3"
                                    ></i>
                                  </Link>{" "}
                                </td>
                                <td>
                                  <button className="flex flex-row w-[100%]">
                                    <Link
                                      className="  py-2 px-3 text-sm rounded-md view-icon"
                                      to={`/courses/${item._id}/module`}
                                      id={item._id}
                                    >
                                      Add Module
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
}

export default Courses;
