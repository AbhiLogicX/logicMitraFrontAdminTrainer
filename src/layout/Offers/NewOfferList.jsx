import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useAdd } from "../../hooks/useAdd";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";
import { Link, useNavigate } from "react-router-dom";

const CreateOfferList = () => {
  // const [categoryCheckField, setCategoryCheckField] = useState(false);

  const [categoryCheckFieldArr, setCategoryCheckFieldArr] = useState([]);
  const [subCategoryCheckFieldArr, setSubCategoryCheckFieldArr] = useState([]);
  const [categoryCheckListOpen, setCategoryCheckListOpen] = useState(false);
  const [subCategoryCheckListOpen, setSubCategoryCheckListOpen] =
    useState(false);
  const [subCategoryCheckList, setSubCategoryCheckList] = useState([]);

  // courses/all-course-filter
  const [reloadCourse, setReloadCourse] = useState(false);
  const [dataCourse, setDataCourse] = useState(null);

  useEffect(() => {
    function fetchCat() {
      const idsOfCat = categoryCheckFieldArr.join();
      const idsOfSubCat = subCategoryCheckFieldArr.join();
      axios
        .post(`/courses/all-course-filter`, {
          catIds: idsOfCat,
          subCatIds: idsOfSubCat,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log("This----->", res);
            setDataCourse(res);
            setReloadCourse(true);
          }
        });
    }
    if (!reloadCourse) {
      fetchCat();
    }
  }, [reloadCourse]);

  const [dataCat, errorCat, loadingCat, reloadCat] = useFetch(
    "/categories/list-subCat-details"
  );

  // const [dataSubCat, errorSubCat, loadingSubCat, reloadSubCat] =
  // useFetch("/categories/list");

  // console.log("cat data--->", dataCat);
  // const [dataCourse, errorCourse, loadingCourse, reloadCourse] = useFetch(
  //   "/courses/all-course"
  // );

  // console.log("This is course Data ---->", dataCourse);
  const [dataTrain, errorTrain, loadingTrain, reloadTrain] =
    useFetch("/trainers/list");

  const local = JSON.parse(localStorage.getItem("admin"));
  const nevigate = useNavigate();

  const [params, setParams] = useState({
    forWhat: "",
    adapterType: "",
    contentList: [],
    title: "",
  });

  //console.log(params);
  const handleChange = async (e) => {
    //console.log(e.target);
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

  const handleCatFilterArrAdd = (e) => {
    const { checked, id } = e.target;

    if (!checked) {
      const category = dataCat?.data?.find((cat) => cat.id === id);
      if (category) {
        const subCategoryIds = category.subCategory.map((subCat) => subCat._id);
        const updatedSubCatList = subCategoryCheckList.filter(
          (subCat) => !subCategoryIds.includes(subCat._id)
        );
        const updatedSubCatListSelected = subCategoryCheckFieldArr.filter(
          (subCats) => !subCategoryIds.includes(subCats)
        );
        setSubCategoryCheckFieldArr(updatedSubCatListSelected);
        // console.log("updatedSubCatListSelected", updatedSubCatListSelected);
        setSubCategoryCheckList(updatedSubCatList);
      }
      const filteredArray = categoryCheckFieldArr.filter((ele) => {
        if (ele !== id) {
          return ele;
        }
      });
      setCategoryCheckFieldArr(filteredArray);
      setReloadCourse(false);
    }
    if (checked) {
      const subcatList = dataCat?.data?.find((cat) => cat.id === id);
      setCategoryCheckFieldArr([...categoryCheckFieldArr, id]);
      setSubCategoryCheckList([
        ...subCategoryCheckList,
        ...subcatList?.subCategory,
      ]);
      setReloadCourse(false);
    }
  };

  const handleSubCatAdd = (e) => {
    const { checked, id } = e.target;
    // console.log(checked, id);
    if (checked) {
      setSubCategoryCheckFieldArr([...subCategoryCheckFieldArr, id]);
      setReloadCourse(false);
    } else {
      const filteredSubArray = subCategoryCheckFieldArr.filter((ele) => {
        if (ele !== id) {
          return ele;
        }
      });
      setSubCategoryCheckFieldArr(filteredSubArray);
      setReloadCourse(false);
    }
    // console.log(subCategoryCheckFieldArr);
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
      await axios.post(`/offerList/add`, paramsToSend).then((res) => {
        if (res.status === 201) {
          toast.success(res?.data?.message || "Data Created successfully");
          nevigate("/offerList");
        } else {
          toast.error(res?.data?.message || "Failed Data");
        }
      });
    } catch (err) {
      // console.log("--->", err);
      toast.error(err?.error || "Failed to process ");
    }
  };

  return (
    <Home>
      <div className="w-[100%] py-3 sm:p-3">
        <h1 className="heading1 text-white px-2 mb-3">Add Offer List</h1>
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
                  value={params?.title}
                  name="title"
                  placeholder="Title"
                  onChange={handleChange}
                  require
                />
              </div>
              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="subcategory">
                  Offer List For
                </label>

                <div>
                  <select
                    name="forWhat"
                    value={params?.forWhat}
                    onChange={handleChange}
                    required
                    id="forWhat"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  >
                    <option selected value="">
                      Select Type...
                    </option>
                    <option value="Category">Category</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Course">Course</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="subcategory">
                  Adapter / Diplay Type
                </label>

                <div>
                  <select
                    required
                    name="adapterType"
                    value={params?.adapterType}
                    onChange={handleChange}
                    id="adapterType"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  >
                    <option selected value="">
                      Select type...
                    </option>
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                  </select>
                </div>
              </div>

              {params?.forWhat === "Course" || params?.forWhat === "Trainer" ? (
                <div className="col-12 col-sm-4  flex flex-col mt-3">
                  <div className="relative">
                    <div
                      className="form-select input text-white"
                      onClick={() => {
                        categoryCheckListOpen
                          ? setCategoryCheckListOpen(false)
                          : setCategoryCheckListOpen(true);
                      }}
                    >
                      {!categoryCheckListOpen
                        ? "Select Category for filter trianer / courses..."
                        : "Close"}
                    </div>
                    {categoryCheckListOpen ? (
                      <div className="absolute bg-gray-800 border border-gray-700 w-full mt-2 rounded-md z-10">
                        {dataCat?.data?.map((option) => (
                          <div
                            key={option.id}
                            className="p-2 flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={option.id}
                              name={option.title}
                              value={option.id}
                              checked={categoryCheckFieldArr.includes(
                                option.id
                              )}
                              onChange={handleCatFilterArrAdd}
                              className="mr-2"
                            />
                            <label htmlFor={option.id} className="text-white">
                              {option.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {categoryCheckFieldArr.length > 0 ? (
                <div className="col-12 col-sm-4  flex flex-col mt-3">
                  <div className="relative">
                    <div
                      className="form-select input text-white"
                      onClick={() => {
                        subCategoryCheckListOpen
                          ? setSubCategoryCheckListOpen(false)
                          : setSubCategoryCheckListOpen(true);
                      }}
                    >
                      {!subCategoryCheckListOpen
                        ? "Select Sub Category for filter trianer / courses..."
                        : "Close"}
                    </div>
                    {subCategoryCheckListOpen ? (
                      <div className="absolute bg-gray-800 border border-gray-700 w-full mt-2 rounded-md z-10">
                        {subCategoryCheckList?.map((option) => (
                          <div
                            key={option._id}
                            className="p-2 flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={option._id}
                              name={option.title}
                              value={option._id}
                              onChange={handleSubCatAdd}
                              className="mr-2"
                            />
                            <label htmlFor={option._id} className="text-white">
                              {option.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* <div className="col-12 col-sm-4  flex flex-col mt-3">
                <label className="text-white" htmlFor="subcategory">
                  Select Sub-Category for filter trianer / courses
                </label>

                <div>
                  <select
                    required
                    name="adapterType"
                    value={params?.adapterType}
                    onChange={handleChange}
                    id="adapterType"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  >
                    <option selected value="">
                      Select type...
                    </option>
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                  </select>
                </div>
              </div> */}
            </div>

            {params.forWhat !== "" ? (
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
                            <th scope="col">Course Title</th>
                            <th scope="col">Trainer name</th>
                            <th scope="col">Add</th>
                          </tr>
                        </thead>
                        {dataCourse !== null ? (
                          <tbody className="table-group-divider">
                            {dataCourse?.data?.data
                              ?.filter(
                                (item) =>
                                  !params?.contentList?.some(
                                    (content) => content.id === item.id
                                  )
                              )
                              .map((item, index) => (
                                <tr key={index} className="Tbody">
                                  <td>{item.ctitle}</td>
                                  <td>{item.ctrainer?.sname}</td>
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
                        ) : null}
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
                        {categoryCheckFieldArr.length > 0 &&
                        dataCourse?.data?.data?.length > 0 ? (
                          <tbody className="table-group-divider">
                            {dataCourse?.data?.data
                              ?.filter(
                                (item) =>
                                  !params?.contentList?.some(
                                    (content) =>
                                      content.id === item.ctrainer._id
                                  )
                              )
                              .map((item, index) => (
                                <>
                                  {item.ctrainer.sname !== "" ? (
                                    <tr key={index} className="Tbody">
                                      <td>{item.ctrainer.sname}</td>

                                      <td className="flex gap-2 items-center justify-center">
                                        <Link
                                          className="py-2 px-3 rounded-md view-icon text-white"
                                          id={item.ctrainer._id}
                                          onClick={() => {
                                            handleChangeAdd(
                                              item.ctrainer._id,
                                              item.ctrainer.sname
                                            );
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
                        ) : (
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
                                            handleChangeAdd(
                                              item.id,
                                              item.sname
                                            );
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
                        )}
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
                Submit
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

export default CreateOfferList;
