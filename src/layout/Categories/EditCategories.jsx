import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import swal from "sweetalert";

import useUpdate from "../../hooks/useUpdate";
import { useFetch } from "../../hooks/useFetch";
import Home from "../../Home";
import { properties } from "../../config/properties";

function EditCategories() {
  const CategoryUrl = "/categories";

  const { id } = useParams();
  const catId = id;

  // Fetch category data using a custom hook (useFetch)

  const [data, error, loading] = useFetch(
    `/categories/cat-detail?catId=${catId}`,
    catId
  );

  // State to store form parameters
  const [params, setParams] = useState({});

  //console.log(params);
  // Updates params when data is fetched
  useEffect(() => {
    if (data) {
      setParams(data.data);
    }
  }, [data, loading, error]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter

    const { name, value, type, files } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  //console.log(params);

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/categories/update-cat`);

  //console.log(params);
  // Handles form submission
  const handleSubmit = (e) => {
    //console.log(e);
    const formData = new FormData();
    formData.append("image", params.imageUrl);

    //console.log(params);
    e.preventDefault();
    // Calls the handleUpdate function from the custom hook
    handleUpdate(`catId=${e.target.id}`, params, CategoryUrl);
  };

  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {data.data && (
          <div className="w-[100%] py-3 p-3 mb-16">
            <form
              // Form for updating category information
              className="forms-sample w-100 m-2 p-4 box"
              onSubmit={handleSubmit}
              id={params?.id}
            >
              {/* Form inputs for category details */}
              <div className="w-100 ">
                {/* Form group for title */}
                <div className="form-group">
                  <div className="flex flex-col-reverse md:flex-row md:flex items-center justify-between ">
                    <div className=" grid grid-cols-1  sm:grid-cols-2 gap-5 w-[100%] md:w-[70%] ">
                      <div className=" ">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Title *
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                          value={params?.title}
                          name="title"
                          placeholder="title"
                          onChange={handleChange}
                        />
                      </div>
                      <div className=" ">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          ImageUrl *
                        </label>
                        <input
                          type="file"
                          className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                          // value={formdata1?.imageUrl[0]}
                          name="imageUrl"
                          placeholder="imageUrl"
                          onChange={handleChange}
                        />
                      </div>

                      <div className=" ">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Sequence
                        </label>
                        <input
                          type="text"
                          className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                          value={params?.sequence}
                          name="sequence"
                          placeholder="sequence"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4">
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Status
                        </label>

                        <div className="text-white d-flex gap-2">
                          <input
                            checked={params?.status == 1 ? true : false}
                            type="radio"
                            id="active"
                            name="status"
                            value={1}
                            onChange={handleChange}
                          />
                          Active
                          <input
                            checked={params?.status == 0 ? true : false}
                            type="radio"
                            id="active"
                            name="status"
                            value={0}
                            onChange={handleChange}
                          />
                          Inactive
                        </div>
                      </div>
                    </div>

                    <div className="h-44 md:h-[100%]  w-[100%] md:w-[20%] border-2 rounded-md">
                      <img
                        src={`${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/categories/${params?.imageUrl}`}
                        alt="logo"
                        className="w-[100%] h-[100%] object-cover"
                      />
                    </div>
                  </div>

                  <div className="">
                    <label
                      className="text-white"
                      htmlFor="exampleInputUsername1"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      cols="10"
                      rows="10"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      value={params?.description}
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit and cancel buttons */}

              <div className=" flex items-center my-4 justify-between">
                <button
                  type="submit"
                  className="submit Add-btn mr-2  rounded-md sm:px-4  px-5 py-2"
                >
                  Update
                </button>
                <Link to={"/categories"}>
                  <button
                    type="reset"
                    className="Cancel-btn  rounded-md sm:px-4  px-5 py-2"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </Home>
    </>
  );
}

export default EditCategories;
