import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { CiFilter } from "react-icons/ci";
import { useAuth } from "../../context/auth";
import Home from "../../Home";
import { useDelete } from "../../hooks/useDelete";

function Students() {
  const [auth, setAuth] = useAuth();
  const [params, setParams] = useState({
    studentName: "",
    courseName: "",
    trainerId: auth?.userId ? auth?.userId : auth?.user,
    courseId: "",
    fromDate: "",
    toDate: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // fetching student data
  const [data, error, loading, setReload] = useFetch(
    `/enroll/enroll-list?studentName=${params.studentName}&courseName=${params.courseName}&trainerid=${params.trainerId}&courseid=${params.courseId}&fromDate=${params.fromDate}&toDate=${params.toDate}`
  );

  // const [data, error, loading, setReload] = useFetchData(
  //   "/user/list?userType=student"
  // );

  // //console.log("sutdetadat", data);
  //setting student categories count
  const [totalStudents, setTotalStudents] = useState(0);
  const [organizationStudents, setOrganisationStudents] = useState(0);
  const [inactiveStudents, setInactiveStudents] = useState(0);
  const [blockedStudents, setBlockedStudents] = useState(0);
  useEffect(() => {
    setTotalStudents(0);
    setBlockedStudents(0);
    setInactiveStudents(0);
    setOrganisationStudents(0);
    data?.data?.map((item) => {
      setTotalStudents((prevTotal) => prevTotal + 1);
      if (item.status === "blocked") {
        setBlockedStudents((blockedStudents) => blockedStudents + 1);
      } else if (item.status === "1") {
        setOrganisationStudents(
          (organisationStudents) => organisationStudents + 1
        );
      } else if (item.status === "0") {
        setInactiveStudents((inactiveStudents) => inactiveStudents + 1);
      }
    });
  }, [data, params]);

  //handling filters
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setReload(false);
  };

  // const { Delete } = useDeleteOne(`/user/delete?userId=`);
  const [Delete] = useDelete(`/user/delete?userId=`);

  //handling delete student request
  const handleDelete = async (e) => {
    // //console.log("delId", e.target.id);
    // //console.log("Delete", Delete);
    Delete(e.target.id, setReload);
  };

  // Fetch category data using a custom hook (useFetch)
  // const [CityList, error3, loading3] = useFetch("/address/city-list", true);

  return (
    <Home>
      <div className="md:pl-3 px-3 text-white w-[100%] mb-16">
        <section className="section mt-1 mb-3">
          <div className="text-xl font-medium d-flex justify-between items-center">
            <h1>Students List</h1>
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="ml-3 py-1 px-3 rounded-md flex items-center text-lg border-1"
              >
                <CiFilter /> Filter
              </button>
            </div>
          </div>
        </section>

        <div className="w-[100%]">
          {loading && <h1 className="text-white">Loading...</h1>}
          {error && <h1 className="text-white">{error.message}</h1>}

          {data?.data && (
            <>
              <div className="row ">
                <Card title="Total Students" value={totalStudents} />
                {/* <Card
                  title="Organization Students"
                  value={organizationStudents}
                />
                <Card title="Inactive Students" value={inactiveStudents} />
                <Card title="Blocked Students" value={blockedStudents} /> */}
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
                      className="table-responsive Ttable mt-4   overflow-y-auto Table-overflow"
                      style={{ maxHeight: "600px", overflowY: "auto" }}
                    >
                      <table className=" table-striped  w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Name</th>
                            <th scope="col"> Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider ">
                          {data?.data?.map((item) => (
                            <>
                              <tr key={item.id} className="Tbody">
                                <td>
                                  {item?.studentid?.sname ? (
                                    item.studentid?.sname
                                  ) : (
                                    <>
                                      "NA" <br />
                                      <small>(not mentioned)</small>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {item?.studentid?.smobile ? (
                                    item.studentid?.smobile
                                  ) : (
                                    <>
                                      "NA" <br />
                                      <small>(not mentioned)</small>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {" "}
                                  {item?.studentid?.semail ? (
                                    item.studentid?.semail
                                  ) : (
                                    <>
                                      "NA" <br />
                                      <small>(not mentioned)</small>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {item?.studentid?.scity ? (
                                    item.studentid?.scity
                                  ) : (
                                    <>
                                      "NA" <br /> <small>(not mentioned)</small>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {item?.studentid?.sstate ? (
                                    item.studentid?.sstate
                                  ) : (
                                    <>
                                      "NA" <br /> <small>(not mentioned)</small>
                                    </>
                                  )}
                                </td>
                              </tr>
                            </>
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
  );
}

export default Students;
