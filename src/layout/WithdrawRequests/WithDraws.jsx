import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Home from "../../Home";
import useUpdate from "../../hooks/useUpdate";
import { CiFilter } from "react-icons/ci";
import { useAuth } from "../../context/auth";

const Withdraws = () => {
  const [auth, setAuth] = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    userType: "",
  });

  const [data, error, loading, setReload] = useFetch(
    `/withdraw/get/${auth?.userId ? auth?.userId : auth?.user}`
  );

  console.log(data);

  const [handleUpdate] = useUpdate(`/withdraw/update-status`);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setReload(false);
  };

  return (
    <>
      <Home>
        <div className="px-3 text-white w-[100%] relative courses-page">
          <section className="section mt-1">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-xl font-medium">Withdraw Requests</h1>
              <button
                onClick={toggleSidebar}
                className="ml-3 py-1 px-3 rounded-md flex items-center text-lg border-1"
              >
                <CiFilter /> Filter
              </button>
            </div>
          </section>

          <div className="w-[100%]">
            {error && <h1 className="text-white">{error.message}</h1>}
            {data?.data && (
              <>
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

                  <div>
                    <div className="mb-2">
                      <label className="text-white" htmlFor="start-date">
                        From Date
                      </label>
                      <input
                        type="date"
                        className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                        name="fromDate"
                        id="start-date"
                        onChange={handleFilter}
                        value={filter.fromDate}
                      />
                    </div>
                    <div>
                      <label className="text-white" htmlFor="start-date">
                        To Date
                      </label>
                      <input
                        type="date"
                        className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                        name="toDate"
                        id="start-date"
                        onChange={handleFilter}
                        value={filter.toDate}
                      />
                    </div>

                    {/* <div>
                      <label className="text-white" htmlFor="start-date">
                        User Type
                      </label>
                      <select
                        className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                        name="userType"
                        id="userType"
                        onChange={handleFilter}
                        value={filter.userType}
                      >
                        <option value="">All</option>
                        <option value="trainer">Trainer</option>
                        <option value="student">Student</option>
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="">
                    {loading && <h1 className="text-white">Loading...</h1>}
                    {error && <h1 className="text-white">{error.message}</h1>}
                    {!loading && (
                      <div className="table-responsive Ttable mt-4 overflow-y-auto Table-overflow">
                        <table className="table-striped w-[100%]">
                          <thead>
                            <tr className="Thead">
                              <th scope="col">User Name</th>
                              <th scope="col">User Type</th>
                              <th scope="col">Status</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Withdraw Raise Date</th>
                              <th scope="col">Updated On</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {data.data?.map((item) => (
                              <tr key={item.id} className="Tbody">
                                <td>{item.userId?.sname}</td>
                                <td>{item.userId?.userType}</td>
                                <td>{item.status}</td>
                                <td>₹{item?.amount}/-</td>
                                <td>{item?.createdAt?.substring(0, 10)}</td>
                                <td>{item?.updatedAt?.substring(0, 10)}</td>
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

export default Withdraws;
