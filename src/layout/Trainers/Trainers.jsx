import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { useDelete } from "../../hooks/useDelete";
import Home from "../../Home";
import { CiFilter } from "react-icons/ci";

function Trainers() {
  const [params, setParams] = useState({
    name: "",
    startDate: "",
    experience: "",
    filter: "",
  });
  // Fetch trainers data using a custom hook (useFetch)
  const [data, error, loading, reloadData] = useFetch(
    `/trainers/search?name=${params.name}&exp=${params.experience}`
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // console.log(data);

  //setting trainers categories count
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [organizationTrainers, setOrganisationTrainers] = useState(0);
  const [inactiveTrainers, setInactiveTrainers] = useState(0);
  const [blockedTrainers, setBlockedTrainers] = useState(0);

  useEffect(() => {
    setTotalTrainers(0);
    setBlockedTrainers(0);
    setInactiveTrainers(0);
    setOrganisationTrainers(0);
    data.data?.map((item) => {
      setTotalTrainers((prevTotal) => prevTotal + 1);
      if (item.status === "blocked") {
        setBlockedTrainers((blockedTrainers) => blockedTrainers + 1);
      } else if (item.status === "1") {
        setOrganisationTrainers(
          (organisationTrainers) => organisationTrainers + 1
        );
      } else if (item.status === "0") {
        setInactiveTrainers((inactiveTrainers) => inactiveTrainers + 1);
      }
    });
  }, [data, params]);

  // Handle changes in filter inputs
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    // console.log(params);
    reloadData(false);
  };

  const [Delete] = useDelete(`/trainers/delete-trainer?trainId=`);

  // Handle deletion of a trainer
  const handleDelete = async (e) => {
    Delete(e.target.id, reloadData);
  };

  //* fetch the city list
  const [CityList, error3, loading3] = useFetch("/address/city-list", true);

  const handleSearchInput = (e) => {
    params.name = e.target.value;
  };

  const handleSearch = async () => {};

  return (
    <Home>
      <div className="md:pl-3 px-3 text-white w-[100%] mb-16">
        <section className="section mt-1 mb-3">
          <div className="text-xl font-medium d-flex justify-between items-center">
            <h1>Trainers List</h1>
            <div className="flex items-center">
              <div className="">
                <Link
                  to="/trainers/add"
                  className="Add-btn py-2 px-3 rounded-md"
                >
                  Add Trainer
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

        <div className=" w-[100%]">
          {/* Display loading message while data is being fetched */}
          {loading && <h1 className="text-white">Loading...</h1>}
          {/* Display error message if there's an error */}
          {error && <h1 className="text-white">{error.message}</h1>}
          {/* Display trainers data if available */}

          {data?.data && (
            <>
              {/* Statistics Cards */}

              <div className="row">
                <Card title="Total Trainers" value={totalTrainers} />
                <Card
                  title="Organization Trainers"
                  value={organizationTrainers}
                />
                <Card title="Inactive Trainers" value={inactiveTrainers} />
                <Card title="Blocked Trainers" value={blockedTrainers} />
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

              {/* Trainers Table */}
              <div className=" w-100">
                <div className=" ">
                  {/* Display loading message while data is being fetched */}
                  {loading && <h1 className="text-white">Loading...</h1>}
                  {/* Display error message if there's an error */}
                  {error && <h1 className="text-white">{error.message}</h1>}
                  {/* Display trainers data if available */}
                  {data?.data && (
                    <div className="table-responsive Ttable mt-4  overflow-y-auto Table-overflow">
                      <table className=" table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">City</th>
                            <th scope="col">Courses</th>
                            <th scope="col">Wallet</th>
                            <th scope="col">Options</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {/* Map through trainers data and display in table rows */}
                          {data?.data?.map((item) => (
                            <tr key={item.id} className="Tbody">
                              <td>
                                {item?.sname ? (
                                  item.sname
                                ) : (
                                  <>
                                    "NA"
                                    <br />
                                    <small>(not mentioned)</small>
                                  </>
                                )}
                              </td>
                              <td>
                                {item?.smobile ? (
                                  item.smobile
                                ) : (
                                  <>
                                    "NA"
                                    <br />
                                    <small>(not mentioned)</small>
                                  </>
                                )}
                              </td>
                              <td>
                                {item?.semail ? (
                                  item.semail
                                ) : (
                                  <>
                                    "NA"
                                    <br />
                                    <small>(not mentioned)</small>
                                  </>
                                )}
                              </td>
                              <td>
                                {item?.sgender ? (
                                  item.sgender
                                ) : (
                                  <>
                                    "NA"
                                    <br />
                                    <small>(not mentioned)</small>
                                  </>
                                )}
                              </td>
                              <td>
                                {item?.scity ? (
                                  item.scity
                                ) : (
                                  <>
                                    "NA" <br />
                                    <small>(not mentioned)</small>
                                  </>
                                )}
                              </td>
                              {/* <td>
                                {CityList?.data
                                  ?.filter((elm) => {
                                    return elm.id === item.scity;
                                  })
                                  .map((elm) => {
                                    return (
                                      <>
                                        <div className="" key={elm.id}>
                                          {elm.title}
                                        </div>
                                      </>
                                    );
                                  })}
                              </td> */}
                              <td>{item.courses.length}</td>
                              <td>{item.walletAmt}</td>
                              <td className="flex gap-2 justify-center">
                                {/* Action links for each trainer */}

                                <Link
                                  className="py-2 px-3 rounded-md  view-icon"
                                  to={`/trainers/view/${item.id}`}
                                >
                                  <i className="bi bi-eye-fill"></i>
                                </Link>
                                <Link
                                  className="py-2 px-3 rounded-md edit-icon"
                                  to={`/trainers/edit/${item.id}`}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link
                                  id={item.id}
                                  className="py-2 px-3 rounded-md  delete-icon"
                                  onClick={handleDelete}
                                >
                                  <i id={item.id} className="bi bi-trash3"></i>
                                </Link>
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
  );
}

export default Trainers;
