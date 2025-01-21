import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

import Popup from "reactjs-popup";

import { useDeleteOne } from "../../../hooks/useDeleteOne";
import { useFetch } from "../../../hooks/useFetch";
import { useAdd } from "../../../hooks/useAdd";
import { UsesubcategoriesContext } from "../../../context/SubcatContext";
import ImageViewer from "../../../components/ImageViewer";
import { toast } from "react-toastify";
import Home from "../../../Home";

function LocationCity() {
  const navigate = useNavigate();
  const CityUrl = "/city";

  const [params, setparams] = useState({
    title: "",
    state: "",
    sequence: "",
    status: "1",
  });
  // //console.log(
  //   params.title,
  //   params.state,

  //   params.sequence,
  //   params.status
  // );
  //handle addition of category
  const handleChange = (event) => {
    //console.log(event.target);
    const { name, value, type, files } = event.target;
    setparams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const [addData] = useAdd(`/address/create-city`);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //console.log(params);

    try {
      const res = await axios.post("/address/create-city", params); //Adding the data
      //console.log(res.data);

      if (res.status === 200) {
        toast.success(res?.data?.message || "Data Created successfully");
        navigate(CityUrl);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res?.data?.message || "Failed Data");
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
    // addData(params , CityUrl);
  };

  // delete the particular Categories
  const { Delete } = useDeleteOne(`/address/delete-city?cityId=`);

  // Handle deletion of a category
  const handleDelete = async (e) => {
    //console.log("cate id is ", e.target.id);

    // try {
    //   const res = await axios.delete(`https://api.logicmitra.com:8086/api/address/delete-city?cityId=${e.target.id}`
    //   ); //Adding the data
    //   //console.log(res.data);

    //   if (res.status === 200) {
    //     toast.success(res?.data?.message || "Data Created successfully");
    //     navigate(CityUrl);

    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 2000);

    //   } else {
    //     toast.error(res?.data?.message || "Failed Data");
    //   }
    // } catch (error) {
    //   toast.error("Error Occurred");
    // }
    Delete(e.target.id, CityUrl);
  };

  // Fetch category data using a custom hook (useFetch)
  const [data, error, loading] = useFetch("/address/city-list", true);

  //console.log(data);

  //   fetch the state address data using fetch api

  const [StateList, error1, loading1] = useFetch(
    "https://api.logicmitra.com:8086/api/address/state-list",
    true
  );

  //console.log(StateList);

  return (
    <Home>
      <div className="py-3  p-3 text-white w-[100%]  relative mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium ">
            <h1>City List</h1>
            <div className="section-header-breadcrumb"></div>
          </div>
        </section>

        {/* Categories Table */}
        <div className="row space-y-5 lg:space-y-0">
          <div className="col col-lg-7">
            <div className="">
              {/* Display loading message while data is being fetched */}
              {loading && <h1 className="text-white">Loading...</h1>}
              {/* Display error message if there's an error */}
              {error && <h1 className="text-white">{error.message}</h1>}
              {/* Display Category data if available */}
              {!data?.data == [] && (
                <div className="table-responsive Ttable  overflow-y-auto Table-overflow">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Title</th>
                        <th scope="col">State</th>

                        <th scope="col">Status</th>
                        <th scope="col">Sequence</th>

                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data.data.map((item) => (
                        <tr key={item.id} className="Tbody">
                          <td>{item.title}</td>
                          <td>
                            {StateList?.data
                              ?.filter((elm) => {
                                return elm.id === item.state;
                              })
                              .map((elm) => {
                                return (
                                  <div className="" key={elm.id}>
                                    {elm.title}
                                  </div>
                                );
                              })}
                          </td>

                          <td>{item.status === 1 ? "Active " : "Inactive"}</td>
                          <td>{item.sequence}</td>

                          <td className="flex gap-2 items-center justify-center">
                            {/* Action links for each trainer */}
                            <Link
                              className="py-2 px-3 rounded-md edit-icon"
                              to={`/city/edit/${item.id}`}
                            >
                              <i class="bi bi-pencil-square"></i>
                            </Link>
                            <Link
                              id={item.id}
                              className=" py-2 px-3 rounded-md delete-icon "
                              onClick={handleDelete}
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
          {data.data && (
            <div className="col-lg-5 lg:px-5">
              <form
                className="box   py-4 shadow-lg  lg:h-50"
                onSubmit={handleSubmit}
              >
                <div className="">
                  <p className="text-white">City</p>
                  <input
                    onChange={handleChange}
                    required
                    name="title"
                    value={params?.title}
                    type="text"
                    placeholder="Title"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">State</p>
                  <select
                    required
                    className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                    onChange={handleChange}
                    name="state"
                    value={params?.state}
                  >
                    <option> select state</option>
                    {StateList?.data?.map((elm) => {
                      return (
                        <>
                          <option value={elm.id}> {elm.title} </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="">
                  <p className="text-white">Status</p>

                  <div className="d-flex justify-content-start text-white gap-4 align-items-center my-2">
                    <div className=" ">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        value={1}
                        checked={params?.status == 1}
                        onChange={handleChange}
                      />
                      Active
                    </div>

                    <div className="">
                      <input
                        type="radio"
                        id="inactive"
                        value={0}
                        name="status"
                        onChange={handleChange}
                        checked={params?.status == 0}
                      />
                      Inactive
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-white">Sequence</p>
                  <input
                    onChange={handleChange}
                    required
                    name="sequence"
                    value={params?.sequence}
                    placeholder="Sequence"
                    type="number"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>

                {/* {similar fields} */}
                <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                  Add City
                </button>
              </form>
            </div>
          )}
        </div>
        {/* Card to show and add subcategories */}
      </div>
    </Home>
  );
}

export default LocationCity;
