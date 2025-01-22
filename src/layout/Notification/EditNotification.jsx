import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../context/auth";

const EditNotification = () => {
  const [auth, setAuth] = useAuth();
  const [viewForWhat, setViewForWhat] = useState("");

  const [Delete] = useDelete(`/notification/delete-notification?notiId=`);

  const [data, error, loading, reloadData] = useFetch(
    `/notification/get-user-notification?userId=${
      auth?.userId ? auth?.userId : auth?.user
    }`
  );
  console.log("--->", data);

  const handleViewBtn = (id, forWhat) => {
    setViewForWhat(forWhat);
  };

  const handleDelete = async (id) => {
    Delete(id, reloadData);
  };

  return (
    <>
      <Home>
        <div className="px-3 text-white w-[100%] mb-16">
          <section className="section mt-1 mb-3">
            <div className="text-xl font-medium d-flex justify-between items-center">
              <h1>Notification List</h1>
            </div>
          </section>

          <div className="w-[100%]">
            {error && <h1 className="text-white">{error.message}</h1>}

            {data?.data && (
              <>
                <div className=" w-[100%] grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    {/* Display loading message while data is being fetched */}
                    {loading && <h1 className="text-white">Loading...</h1>}
                    {/* Display error message if there's an error */}
                    {error && <h1 className="text-white">{error.message}</h1>}
                    {/* Display trainers data if available */}
                    {data?.data?.length !== 0 && (
                      <div
                        className="table-responsive Ttable mt-4 overflow-y-auto Table-overflow"
                        style={{ maxHeight: "650px", overflowY: "auto" }}
                      >
                        <table className=" table-striped w-[100%]">
                          <thead>
                            <tr className="Thead">
                              <th scope="col">Notification Title</th>
                              <th scope="col">User type</th>
                              <th scope="col">Sent Date</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {data.data?.notification?.map((item, index) => (
                              <tr key={index} className="Tbody">
                                <td id={item._id}>{item.title}</td>
                                <td>{item.userType}</td>
                                <td>{item.date.substring(0, 10)}</td>
                                <td className="flex gap-2 items-cente justify-center">
                                  <Link
                                    className="  py-2 px-3 rounded-md view-icon"
                                    id={item._id}
                                    onClick={() => {
                                      handleViewBtn(item._id, item.message);
                                    }}
                                  >
                                    <i className="bi bi-eye-fill"></i>
                                  </Link>
                                  <Link
                                    className="  py-2 px-3 rounded-md delete-icon"
                                    id={item._id}
                                    onClick={() => {
                                      handleDelete(item._id);
                                    }}
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
                      <h1 className="heading font-medium">
                        Notification message
                      </h1>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: viewForWhat }}
                    ></div>
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

export default EditNotification;
