import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import Home from "../../Home";

const EditSubModule = () => {
  const navigate = useNavigate();

  // * find the id for the submodule to edit the data
  const { id } = useParams();

  const SubModuleId = id;

  // todo find the url to redirect the submodule

  const Url = window.location.href;
  const SubModuleUrl = Url.substring(Url.indexOf("/courses/"));

  const SubModuleUrl1 = SubModuleUrl.substring(
    0,
    SubModuleUrl.lastIndexOf("/edit/")
  );

  const [data, error, loading] = useFetch(
    `/course-detail/get-submodule-detail?submoduleId=${SubModuleId}`
  );
  const [params, setParams] = useState({});
  useEffect(() => {
    if (data) {
      setParams(data?.data);
    }
  }, [data]);

  // console.log(params?.duration);

  //console.log(params);
  const handleChange = async (e) => {
    //console.log(e.target);
    const { name, value, type, files } = e.target;
    setParams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const [handleUpdate] = useUpdate(`/course-detail/update-submodule`);
  const handleSubmit = async (e) => {
    //console.log(e);
    e.preventDefault();
    handleUpdate(`submoduleId=${e.target.id}`, params, SubModuleUrl1);
  };

  return (
    <Home>
      <div>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {data.data && (
          <div className="w-100 p-3">
            <form
              // Form for updating category information
              className="box forms-sample w-100 m-2 p-4 card"
              onSubmit={handleSubmit}
              id={params?.id}
            >
              {/* Form inputs for category details */}
              <div className="w-100 d-flex gap-3">
                {/* Form group for title */}
                <div className="form-group w-100 row">
                  <div className="col-4">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={params?.title}
                      name="title"
                      placeholder="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      File Url
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      defaultValue={params?.fileUrl}
                      name="fileUrl"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      Video Url
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      defaultValue={params?.videoUrl}
                      name="videoUrl"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-4">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      Status
                    </label>
                    <div className="text-black d-flex gap-2">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        defaultValue={1}
                        checked={params?.status === 1}
                        onChange={handleChange}
                      />
                      y<lable className="text-white">Active</lable>
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        defaultValue={0}
                        checked={params?.status === 0}
                        onChange={handleChange}
                      />
                      <lable className="text-white">Inactive</lable>
                    </div>
                  </div>

                  <div className="col-4">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      Duration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={params?.duration}
                      name="duration"
                      placeholder="Enter Duration"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      Sequence
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={params?.sequence}
                      name="sequence"
                      placeholder="sequence"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="exampleInputUsername1"
                      className="text-white"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      cols="30"
                      rows="10"
                      className="form-control"
                      defaultValue={params?.description}
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit and cancel buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="Add-btn rounded-sm py-2 my-2  px-5"
                >
                  Update
                </button>
                <button
                  type="reset"
                  className="Cancel-btn  py-2  rounded-sm my-2 px-5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Home>
  );
};

export default EditSubModule;
