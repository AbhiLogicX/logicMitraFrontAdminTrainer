import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

import Popup from "reactjs-popup";

import { useAdd } from "../../../hooks/useAdd";

import { useFetch } from "../../../hooks/useFetch";
import { useDeleteOne } from "../../../hooks/useDeleteOne";
import { toast } from "react-toastify";
import Home from "../../../Home";

function LocationCountry() {
  const CountryUrl = "/country";
  const navigate = useNavigate();

  const [params, setparams] = useState({
    title: "",

    sequence: "",
    status: "1",
    currency: "",
  });
  //console.log(params);
  //handle addition of category
  const handleChange = (event) => {
    //console.log(event.target);
    const { name, value, type, files } = event.target;
    setparams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //console.log(params);

    // addData(params, CountryUrl);

    try {
      const res = await axios.post("/address/create-country", params); //Adding the data
      //console.log(res.data);

      if (res.status === 200) {
        toast.success(res?.data?.message || "Data Created successfully");
        navigate(CountryUrl);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res?.data?.message || "Failed Data");
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  // delete the particular City
  const { Delete } = useDeleteOne(`/address/delete-country?counId=`);

  // Handle deletion of a category
  const handleDelete = async (e) => {
    //console.log("cate id is ", e.target.id);
    Delete(e.target.id, CountryUrl);
  };

  // Fetch category data using a custom hook (useFetch)

  const [data, error, loading] = useFetch("/address/country-list", true);

  //console.log(data);

  //console.log("hello dear");
  // /api/address/country-list

  const [data1, error1, loading1] = useFetch("/address/country-list", true);

  //console.log(data1);

  return (
    <Home>
      <div className="py-3  p-3 text-white w-[100%]  relative mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium ">
            <h1>Country List</h1>
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
                <div className="table-responsive Ttable   overflow-y-auto Table-overflow">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Title</th>
                        <th scope="col">Currency</th>

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
                          <td>{item.currency}</td>

                          <td>{item.status === 1 ? "Active " : "Inactive"}</td>
                          <td>{item.sequence}</td>

                          <td className="flex gap-2 items-center justify-center">
                            {/* Action links for each trainer */}
                            <Link
                              className="py-2 px-3 rounded-md edit-icon"
                              to={`/country/edit/${item.id}`}
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
                  <p className="text-white">Country</p>
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
                  <p className="text-white">currency</p>
                  <select
                    required
                    className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                    onChange={handleChange}
                    name="currency"
                    placeholder="Currency"
                    value={params?.currency}
                  >
                    <option>select currency</option>
                    {data1?.data?.map((elm) => {
                      return (
                        <>
                          <option value={elm.currency}> {elm.currency} </option>
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
                    type="number"
                    placeholder="Sequence"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>

                {/* {similar fields} */}
                <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                  Add Country
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

export default LocationCountry;
