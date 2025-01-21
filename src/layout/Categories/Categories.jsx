import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
// import swal from "sweetalert";
// import axios from "axios";
// import useUpdate from "../../hooks/useUpdate";
// import { useFetchOnce } from "../../hooks/useFetchOnce";
import { useDelete } from "../../hooks/useDelete";
import { useAdd } from "../../hooks/useAdd";

import Popup from "reactjs-popup";
import ImageViewer from "../../components/ImageViewer";
import Home from "../../Home";
import { properties } from "../../config/properties";

function Categories() {
  // const CategoryUrl = "/categories";

  const [params, setparams] = useState({
    title: "",
    imageUrl: "",
    sequence: "",
    status: "1",
    description: "",
  });
  // //console.log(
  //   params.title,
  //   params.imageUrl,
  //   params.description,
  //   params.sequence,
  //   params.status
  // );

  // Fetch category data using a custom hook (useFetch)
  const [data, error, loading, setReload] = useFetch("/categories/list", true);

  //handle addition of category
  const handleChange = (event) => {
    //console.log(event.target);
    const { name, value, type, files } = event.target;
    setparams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const [addData] = useAdd(`/categories/create-cat`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", params.imageUrl);

    //console.log(params);
    addData(params, "", setReload);

    setparams({
      title: "",
      imageUrl: "",
      sequence: "",
      status: "1",
      description: "",
    });
  };

  //console.log(params, CategoryUrl);
  // delete the particular Categories
  const [Delete] = useDelete(`/categories/delete-cat?catId=`);

  // Handle deletion of a category
  const handleDelete = async (e) => {
    //console.log("cate id is ", e.target.id);
    Delete(e.target.id, setReload);
  };

  //console.log(data);

  return (
    <Home>
      <div className="px-3 text-white w-[100%]  relative mb-16">
        <section className="section mb-3 mt-1">
          <div className="text-xl font-medium ">
            <h1>Category List</h1>
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
              {data?.data?.length !== 0 && (
                <div className="table-responsive Ttable  overflow-y-auto Table-overflow">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                        <th scope="col">Sequence</th>
                        <th scope="col">Subcat</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data?.data?.map((item) => (
                        <tr key={item.id} className="Tbody">
                          <td>{item.title}</td>
                          <td>
                            <Popup
                              trigger={
                                <button>
                                  {" "}
                                  {item.imageUrl || item.imageUrl !== "" ? (
                                    <img
                                      src={`${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/categories/${item.imageUrl}`}
                                      alt="logo"
                                      className="w-10 h-10 rounded-md"
                                    />
                                  ) : (
                                    <img
                                      src="/question_mark_place_holder.png"
                                      alt="logo"
                                      className="w-10 h-10 rounded-md"
                                    />
                                  )}
                                </button>
                              }
                              modal
                              nested
                            >
                              {(close) => (
                                <ImageViewer
                                  url={`${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/categories/${item.imageUrl}`}
                                  close={close}
                                />
                              )}
                            </Popup>
                          </td>

                          <td>{item.status === 1 ? "Active " : "Inactive"}</td>
                          <td>{item.sequence}</td>

                          <td className="w-full">
                            {/* This button will show te subcatehory card */}
                            <button className="btn ">
                              <Link
                                to={`/categories/${item.id}/subcategories`}
                                className="py-2 px-3 rounded-md view-icon text-white"
                                id={item.id}
                              >
                                <i id={item.id} className="bi bi-eye-fill"></i>
                              </Link>
                            </button>
                          </td>
                          <td className="flex gap-2 items-center justify-center">
                            {/* Action links for each trainer */}
                            <Link
                              className="py-2 px-3 rounded-md edit-icon"
                              to={`/categories/edit/${item.id}`}
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
                  <p className="text-white"> Title *</p>
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
                  <p className="text-white"> Image Url *</p>
                  <input
                    onChange={handleChange}
                    required
                    name="imageUrl"
                    // value={params?.imageUrl}
                    type="file"
                    multiple={true}
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
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
                      />
                      Inactive
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-white">Sequence</p>
                  <input
                    onChange={handleChange}
                    name="sequence"
                    value={params?.sequence}
                    placeholder="Sequence"
                    type="number"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Description</p>
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                    value={params?.description}
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* {similar fields} */}
                <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                  Add Category
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

export default Categories;
