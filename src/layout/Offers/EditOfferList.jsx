import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useAdd } from "../../hooks/useAdd";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditOfferList = () => {
  const locationParams = useParams();

  const [params, setParams] = useState({
    title: "",
    forWhat: "",
    adapterType: "",
    contentList: [],
  });

  const [data, error, loading, reload] = useFetch(
    `/offerList/offer/${locationParams.id}`
  );

  const [dataCat, errorCat, loadingCat, reloadCat] =
    useFetch("/categories/list");
  const [dataCourse, errorCourse, loadingCourse, reloadCourse] = useFetch(
    "/courses/all-course"
  );
  const [dataTrain, errorTrain, loadingTrain, reloadTrain] =
    useFetch("/trainers/list");

  // console.log(
  //   "cat--->",
  //   dataCat,
  //   "cour--->",
  //   dataCourse,
  //   "train--->",
  //   dataTrain,
  //   "defData",
  //   data?.data?.contentList
  // );

  const nevigate = useNavigate();

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      title: data?.data?.title,
      forWhat: data?.data?.forWhat,
      adapterType: data?.data?.adapterType,
      contentList: data?.data?.contentList,
    }));
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setParams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleChangeRemove = (eleItem) => {
    const newObj = params?.contentList.filter((item) => item.id !== eleItem.id);

    setParams((prev) => ({
      ...prev,
      contentList: newObj, // Use the filtered array here
    }));
  };

  const handleChangeAdd = (id, title) => {
    // Check if the element already exists in the contentList
    const exists = params?.contentList?.some((item) => item.id === id);

    if (!exists) {
      if (params?.forWhat === "Category") {
        const newObj = [...params?.contentList, { title: title, id: id }];
        setParams((prev) => ({
          ...prev,
          contentList: newObj,
        }));
      }
      if (params?.forWhat === "Trainer") {
        const newObj = [...params?.contentList, { sname: title, id: id }];
        setParams((prev) => ({
          ...prev,
          contentList: newObj,
        }));
      }

      if (params?.forWhat === "Course") {
        const newObj = [...params?.contentList, { ctitle: title, id: id }];
        setParams((prev) => ({
          ...prev,
          contentList: newObj,
        }));
      }
      // Create a new array
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const arrOfId = params?.contentList?.map((item) => item.id);
    const paramsToSend = { ...params, contentList: arrOfId };
    try {
      await axios
        .put(`/offerList/edit/${locationParams.id}`, paramsToSend)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.data?.message || "Data Created successfully");
            nevigate("/offerList");
          } else {
            toast.error(res?.data?.message || "Failed Data");
          }
        });
    } catch (err) {
      toast.error(err?.message || "Failed to prccess");
    }
  };
  return (
    <Home>
      <div className="w-[100%] py-3 sm:p-3">
        <h1 className="heading1 text-white px-2 mb-3">Edit Offer List</h1>
        <form
          // Form for Adding Course information
          className="forms-sample  m-2 p-4 box "
          onSubmit={handleSubmit}
        >
          {/* Form inputs for course details */}
          <div className="w-100  gap-3">
            {/* Form group for coursename*/}
            <div className="form-group  row">
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Title of Offer List
                </label>
                <input
                  type="text"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="title"
                  placeholder="Title"
                  value={params.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="subcategory">
                  Offer List For
                </label>

                <div>
                  <select
                    name="forWhat"
                    value={params.forWhat} // Controlled component with state binding
                    onChange={handleChange}
                    id="forWhat"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  >
                    <option value="">Select Type...</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Course">Course</option>
                    <option value="Category">Category</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-sm-4 flex flex-col">
                <label className="text-white" htmlFor="adapterType">
                  Adapter / Diplay Type
                </label>
                <div>
                  <select
                    name="adapterType"
                    value={params.adapterType} // Controlled component with state binding
                    onChange={handleChange}
                    id="adapterType"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  >
                    <option value="">Select Adapter Type...</option>
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                  </select>
                </div>
              </div>
            </div>

            {data?.data?.forWhat !== "" ? (
              <div className="row space-y-5 lg:space-y-0">
                <div className="col col-lg-6">
                  <h1 className="text-xl font-medium mt-3 mb-2 heading text-white">
                    {params?.forWhat} list
                  </h1>
                  {params?.forWhat === "Category" ? (
                    <div className="table-responsive Ttable text-white">
                      <table className="table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Category Title</th>
                            <th scope="col">Add</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {dataCat?.data
                            ?.filter(
                              (item) =>
                                !params?.contentList?.some(
                                  (content) => content.id === item.id
                                )
                            )
                            .map((item, index) => (
                              <tr key={index} className="Tbody">
                                <td>{item.title}</td>
                                <td className="flex gap-2 items-center justify-center">
                                  <Link
                                    className="py-2 px-3 rounded-md view-icon text-white"
                                    id={item.id}
                                    onClick={() => {
                                      handleChangeAdd(item.id, item.title);
                                    }}
                                  >
                                    Add
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {params?.forWhat === "Course" ? (
                    <div className="table-responsive Ttable text-white">
                      <table className="table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Category Title</th>
                            <th scope="col">Add</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {dataCourse?.data
                            ?.filter(
                              (item) =>
                                !params?.contentList?.some(
                                  (content) => content.id === item.id
                                )
                            )
                            .map((item, index) => (
                              <tr key={index} className="Tbody">
                                <td>{item.ctitle}</td>
                                <td className="flex gap-2 items-center justify-center">
                                  <Link
                                    className="py-2 px-3 rounded-md view-icon text-white"
                                    id={item.id}
                                    onClick={() => {
                                      handleChangeAdd(item.id, item.ctitle);
                                    }}
                                  >
                                    Add
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {params?.forWhat === "Trainer" ? (
                    <div className="table-responsive Ttable text-white">
                      <table className="table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Trainer Name</th>
                            <th scope="col">Add</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {dataTrain?.data
                            ?.filter(
                              (item) =>
                                !params?.contentList?.some(
                                  (content) => content.id === item.id
                                )
                            )
                            .map((item, index) => (
                              <>
                                {item.sname !== "" ? (
                                  <tr key={index} className="Tbody">
                                    <td>{item.sname}</td>

                                    <td className="flex gap-2 items-center justify-center">
                                      <Link
                                        className="py-2 px-3 rounded-md view-icon text-white"
                                        id={item.id}
                                        onClick={() => {
                                          handleChangeAdd(item.id, item.sname);
                                        }}
                                      >
                                        Add
                                      </Link>
                                    </td>
                                  </tr>
                                ) : null}
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
                <div className="col col-lg-6">
                  <h1 className="text-xl font-medium mt-3 mb-2 heading text-white">
                    Offer Content List
                  </h1>
                  {params?.forWhat === "Category" ? (
                    <div className="table-responsive Ttable text-white">
                      <table className="table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Category Title</th>
                            <th scope="col">Remove</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {params?.contentList?.map((item, index) => (
                            <tr key={index} className="Tbody">
                              <td>{item.title}</td>
                              <td className="flex gap-2 items-center justify-center">
                                <Link
                                  className="py-2 px-3 rounded-md view-icon text-white"
                                  id={item}
                                  onClick={() => {
                                    handleChangeRemove(item);
                                  }}
                                >
                                  Remove
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {params?.forWhat === "Trainer" ? (
                    <div className="table-responsive Ttable text-white">
                      <table className="table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Trainer Name</th>
                            <th scope="col">Remove</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {params?.contentList?.map((item, index) => (
                            <tr key={index} className="Tbody">
                              <td>{item.sname}</td>
                              <td className="flex gap-2 items-center justify-center">
                                <Link
                                  className="py-2 px-3 rounded-md view-icon text-white"
                                  id={item}
                                  onClick={() => {
                                    handleChangeRemove(item);
                                  }}
                                >
                                  Remove
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {params?.forWhat === "Course" ? (
                    <div className="table-responsive Ttable text-white">
                      <table className="table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Trainer Name</th>
                            <th scope="col">Remove</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {params?.contentList?.map((item, index) => (
                            <tr key={index} className="Tbody">
                              <td>{item.ctitle}</td>
                              <td className="flex gap-2 items-center justify-center">
                                <Link
                                  className="py-2 px-3 rounded-md view-icon text-white"
                                  id={item}
                                  onClick={() => {
                                    handleChangeRemove(item);
                                  }}
                                >
                                  Remove
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Submit and cancel buttons */}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="Add-btn rounded-sm py-2 my-2  px-4"
              >
                Update
              </button>
              <Link to={"/offerList"}>
                <button
                  type="reset"
                  className="Cancel-btn  py-2  rounded-sm my-2 px-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Home>
  );
};

export default EditOfferList;
