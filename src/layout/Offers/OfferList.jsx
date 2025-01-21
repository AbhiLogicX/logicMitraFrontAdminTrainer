import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { CiFilter } from "react-icons/ci";
import { useDelete } from "../../hooks/useDelete";

const OffersList = () => {
  const [params, setParams] = useState({
    studentName: "",
    courseName: "",
    trainerName: "",
    enrollDate: "",
  });

  const [viewForWhat, setViewForWhat] = useState("");

  // const { Delete } = useDeleteOne(`/user/delete?userId=`);
  const [Delete] = useDelete(`/offerList/delete/`);

  const [OfferId, setOfferId] = useState(`/offerList/offer/`);

  const [data, error, loading, reloadData] = useFetch(`/offerList/all`);
  // console.log("---->", data);

  const [offerData, offerError, offerLoading, OfferReloadData] =
    useFetch(OfferId);
  // console.log("--->>>>", offerData?.data);

  const handleViewBtn = (id, forWhat) => {
    setViewForWhat(forWhat);
    setOfferId(`/offerList/offer/${id}`);
    OfferReloadData();
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    // console.log(params);
    reloadData(false);
  };

  //handling delete student request
  const handleDelete = async (e) => {
    // console.log("delId", e.target.id);
    // //console.log("Delete", Delete);
    Delete(e.target.id, reloadData);
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
              <h1>Offers List</h1>
              <div className="flex items-center">
                <div className="">
                  <Link
                    to="/add-offer-list"
                    className="Add-btn py-2 px-3 rounded-md"
                  >
                    Create Offer List
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
                  <div className="mb-4">
                    <label className="text-white" htmlFor="start-date">
                      Enroll Date
                    </label>
                    <input
                      type="date"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                      name="enrollDate"
                      id="start-date"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className=" w-[100%] grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    {/* Display loading message while data is being fetched */}
                    {loading && <h1 className="text-white">Loading...</h1>}
                    {/* Display error message if there's an error */}
                    {error && <h1 className="text-white">{error.message}</h1>}
                    {/* Display trainers data if available */}
                    {data?.data?.length !== 0 && (
                      <div className="table-responsive Ttable mt-4 overflow-y-auto Table-overflow">
                        <table className=" table-striped w-[100%]">
                          <thead>
                            <tr className="Thead">
                              <th scope="col">Title</th>
                              <th scope="col">Adapter Type</th>
                              <th scope="col">Offer For What</th>
                              <th scope="col">Options</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {data.data?.map((item, index) => (
                              <tr key={index} className="Tbody">
                                <td id={item._id}>{item.title}</td>
                                <td>{item.adapterType}</td>
                                <td>{item.forWhat}</td>

                                <td className="flex gap-2 items-cente justify-center">
                                  <Link
                                    className="  py-2 px-3 rounded-md view-icon"
                                    id={item._id}
                                    onClick={() => {
                                      handleViewBtn(item._id, item.forWhat);
                                    }}
                                  >
                                    <i className="bi bi-eye-fill"></i>
                                  </Link>{" "}
                                  <Link
                                    className="py-2 px-3 rounded-md edit-icon"
                                    to={`/edit-offerList/${item._id}`}
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link>
                                  <Link
                                    className="  py-2 px-3 rounded-md delete-icon"
                                    id={item._id}
                                    onClick={handleDelete}
                                  >
                                    <i
                                      id={item.id}
                                      className="bi bi-trash3"
                                    ></i>
                                  </Link>{" "}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div className="w-[100%] border-1 border-amber-400 box mt-4 rounded-md ">
                    <div className="mb-3">
                      <h1 className="heading font-medium">Content List</h1>
                    </div>
                    <div>
                      <ul>
                        {viewForWhat === "Category" ? (
                          <>
                            {offerData?.data?.contentList?.map((ele, idx) => (
                              <li id={ele.id} className="flex gap-2">
                                <p>{idx + 1}.</p>
                                <p className="text-bold mb-2">{ele.title}</p>
                              </li>
                            ))}
                          </>
                        ) : null}
                        {viewForWhat === "Trainer" ? (
                          <>
                            {offerData?.data?.contentList?.map((ele, idx) => (
                              <li id={ele.id} className="flex gap-2">
                                <p>{idx + 1}.</p>
                                <p className="text-bold mb-2">{ele.sname}</p>
                              </li>
                            ))}
                          </>
                        ) : null}
                        {viewForWhat === "Course" ? (
                          <>
                            {offerData?.data?.contentList?.map((ele, idx) => (
                              <li id={ele.id} className="flex gap-2">
                                <p>{idx + 1}.</p>
                                <p className="text-bold mb-2">{ele.ctitle}</p>
                              </li>
                            ))}
                          </>
                        ) : null}
                      </ul>
                    </div>
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

export default OffersList;
