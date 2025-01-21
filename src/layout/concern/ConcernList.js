import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Home from "../../Home";
import { useDelete } from "../../hooks/useDelete";

function ConcernList() {
  const navigate = useNavigate();
  const [paramsAdd, setparamsAdd] = useState({
    concernTitle: "",
  });

  const [Delete] = useDelete(`/concern/delete/`);

  const [data, error, loading, setReload] = useFetch("/concern/list", true);

  const [paramsEdit, setparamsEdit] = useState({
    concernTitle: "",
    id: "",
  });

  const handleChangeAdd = (event) => {
    const { name, value, type, files } = event.target;
    setparamsAdd({
      ...paramsAdd,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleEditForm = (title, id) => {
    setparamsEdit({
      ...paramsEdit,
      concernTitle: title,
      id: id,
    });
  };

  const handleChangeEdit = (event) => {
    const { name, value, type, files } = event.target;
    setparamsEdit({
      ...paramsEdit,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleClearEditForm = () => {
    setparamsEdit({
      concernTitle: "",
      id: "",
    });
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("/concern/add", paramsAdd);
      if (res.status === 201) {
        toast.success(res?.data?.message || "Data Created successfully");
        setReload(false);
        setparamsAdd({ concernTitle: "" });
      } else {
        toast.error(res?.data?.message || "Failed Data");
      }
    } catch (error) {}
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.put(
        `/concern/update/${paramsEdit.id}`,
        paramsEdit
      );
      if (res.status === 200) {
        toast.success(res?.data?.message || "Data Created successfully");
        setReload(false);
        setparamsEdit({
          concernTitle: "",
          id: "",
        });
      } else {
        toast.error(res?.data?.message || "Failed Data");
      }
    } catch (error) {}
  };

  const handleDelete = async (e) => {
    Delete(e.target.id, setReload);
  };

  return (
    <Home>
      <div className="px-4 text-white w-[100%]  relative mb-16">
        <section className="section mt-1 mb-4">
          <div className="text-xl font-medium ">
            <h1>Concern List</h1>
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
              {data.data && (
                <div className="table-responsive Ttable  h-[550px] overflow-y-auto Table-overflow">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Concern</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {data.data.map((item) => (
                        <tr key={item.id} className="Tbody">
                          <td>{item?.concernTitle}</td>
                          <td className="flex gap-2 items-center justify-center">
                            <Link
                              className="py-2 px-3 rounded-md edit-icon"
                              onClick={() => {
                                handleEditForm(item.concernTitle, item.id);
                              }}
                            >
                              <i class="bi bi-pencil-square"></i>
                            </Link>
                            <Link
                              className="  py-2 px-3 rounded-md delete-icon "
                              id={item.id}
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
          {data.data && (
            <div className="col-lg-5 lg:px-5">
              <form
                className="box py-4 shadow-lg  lg:h-50 mb-5"
                onSubmit={handleSubmitAdd}
              >
                <div className="mb-3">
                  <h4 className="heading">Add Concern </h4>
                </div>
                <div className="">
                  <p className="text-white">Concern title</p>
                  <input
                    onChange={handleChangeAdd}
                    required
                    name="concernTitle"
                    value={paramsAdd?.concernTitle}
                    placeholder="Enter concern"
                    type="text"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>

                {/* {similar fields} */}
                <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                  Add Concern
                </button>
              </form>

              {paramsEdit?.concernTitle !== "" ? (
                <form
                  className="box   py-4 shadow-lg  lg:h-50"
                  onSubmit={handleSubmitEdit}
                >
                  <div className="heading mb-3 flex justify-between items-end">
                    <h4 className="">Edit Concern </h4>
                    <button
                      className="Add-btn px-3 py-2 rounded-md"
                      onClick={handleClearEditForm}
                    >
                      Cancel Edit
                    </button>
                  </div>
                  <div className="">
                    <p className="text-white">Concern list</p>
                    <input
                      onChange={handleChangeEdit}
                      required
                      name="concernTitle"
                      value={paramsEdit?.concernTitle}
                      placeholder="Enter concern"
                      type="text"
                      className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                    />
                  </div>

                  {/* {similar fields} */}
                  <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                    Update Concern
                  </button>
                </form>
              ) : null}
            </div>
          )}
        </div>
        {/* Card to show and add subcategories */}
      </div>
    </Home>
  );
}

export default ConcernList;
