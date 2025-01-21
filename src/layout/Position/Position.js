// api/subscription/assigned-positions

import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
// import Card from "../../components/Card";
// import swal from "sweetalert";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import moment from "moment";
import Home from "../../Home";
function Position() {
  const PositionUrl = "/position";
  //setting parameters for future requests
  const [params, setParams] = useState({
    name: "",
    startDate: "",
    endDate: "",
    filter: "",
  });

  //fetching student data
  const [data, error, loading] = useFetch(
    "/subscription/assigned-positions",
    params
  );

  //console.log("positiondata", data);

  //handling filters
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const { Delete } = useDeleteOne(`/user/delete-user?userId=`);

  //handling delete student request
  const handleDelete = async (e) => {
    //console.log(e.target.id);

    Delete(e.target.id, PositionUrl);
  };

  const SortPosData = data?.data?.sort((a, b) => {
    return a.position - b.position;
  });

  return (
    <Home>
      <div className="md:pl-3  p-3 text-white w-[100%] ">
        <section className="section py-3">
          <div className="text-xl font-medium   d-flex justify-between items-center">
            <h1>Position List</h1>
            {/* <div className="">
            <Link to="/students/add" className="Add-btn py-2 px-3 rounded-md hover:border-none hover:outline-none">
              Add Student
            </Link>
          </div> */}
          </div>
        </section>

        <div className="w-[100%] ">
          <div className="row">
            <div className="col">
              <div className="box ">
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
                      className="form-control input focus-within:bg-none focus:border-none outline-none fs-6  w-[100%] text-white"
                      id="search"
                      name="name"
                      onChange={handleChange}
                      aria-describedby="emailHelp"
                      placeholder="search "
                    />
                  </div>
                  <div className="col-12 col-sm-3 text-white">
                    <label className="text-white" htmlFor="start-date">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control input focus-within:bg-none focus:border-none outline-none "
                      name="startDate"
                      id="start-date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-3 text-white">
                    <label className="text-white" htmlFor="end-date">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control input focus-within:bg-none focus:border-none outline-none "
                      id="endDate"
                      placeholder=""
                      onChange={handleChange}
                      name="end-date"
                    />
                  </div>
                  <div className="col-12 col-sm-3 text-white">
                    <label className="text-white" htmlFor="filters">
                      Filters
                    </label>
                    <select
                      id="filters"
                      className="form-select py-2 input focus-within:bg-none focus:bg-none focus-within:border-none outline-none"
                      value={params.filter}
                      onChange={handleChange}
                      name="filter"
                      aria-label=""
                    >
                      <option className="h-100">Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-[100%]">
            <div className=" ">
              {loading && <h1 className="text-white">Loading...</h1>}
              {error && <h1 className="text-white">{error.message}</h1>}

              {!data?.data?.length === 0 && (
                <div className="table-responsive Ttable mt-4   h-[550px] overflow-y-auto Table-overflow">
                  <table className=" table-striped  w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">City</th>
                        <th scope="col"> Position</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Start Date</th>

                        <th scope="col">End Date</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>

                    <tbody className="table-group-divider ">
                      {SortPosData?.map((item) => (
                        <tr key={item.id} className="Tbody ">
                          <td>{item.city.title}</td>
                          <td>{item.position}</td>
                          <td> {item.fees}</td>
                          <td>
                            {item.startedOn == null
                              ? "null"
                              : moment(item.startedOn).format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {item.endsOn == null
                              ? "null"
                              : moment(item.endsOn).format("DD/MM/YYYY")}
                          </td>

                          <td className="flex gap-2 items-center justify-center">
                            <Link
                              className=" px-3 py-2 rounded-md  view-icon"
                              to={`/students/view/${item.id}`}
                            >
                              <i className="bi bi-eye-fill"></i>
                            </Link>{" "}
                            <Link
                              className="px-3 py-2 rounded-md edit-icon"
                              to={`/students/edit/${item.id}`}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                            <Link
                              className=" px-3 py-2 rounded-md  delete-icon "
                              onClick={handleDelete}
                              id={item.id}
                            >
                              <i id={item.id} className="bi bi-trash3"></i>
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
        </div>
      </div>
    </Home>
  );
}

export default Position;
