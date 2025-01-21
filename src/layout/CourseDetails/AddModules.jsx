import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
// import { useAdd } from "../../hooks/useAdd";
// import swal from "sweetalert";
// import { UseCourseContext } from "../../context/CourseContext";
// import { UsesubcategoriesContext } from "../../context/SubcatContext";
import { useDelete } from "../../hooks/useDelete";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";

const AddModules = () => {
  // use params to fetch the particular course id

  const { id } = useParams();

  const CourseId = id;

  // const navigate = useNavigate();

  const Url = window.location.href;
  const ModuleUrl = Url.substring(Url.indexOf("/courses/"));

  // * to fetch the trainer id through particular course

  // const [TrainerId , setTrainerId] = useState()

  const [params, setparams] = useState({
    title: "",
    description: "",
    duration: "",
    fileUrl: "",
    videoUrl: "",
    // trainer: data?.data?.ctrainer?._id,
    status: "1",
    course: CourseId,
    sequence: "",
  });

  //console.log(params);

  //fetch module data from couses
  const [data, error, loading, setReload] = useFetch(
    `/course-detail/course-modules?courseId=${CourseId}`,
    CourseId
  );

  //*add module data

  // const [addData] = useAdd(`/course-detail/create-module`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // addData(params, ModuleUrl);
    await axios
      .post(`/course-detail/create-module`, params)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message || "Data Created successfully");
          setReload(false);
        } else {
          toast.error(res?.data?.message || "Failed Data");
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed Data");
      });
  };

  const handleChange = (event) => {
    //console.log(event.target);
    const { name, value } = event.target;
    setparams({
      ...params,
      [name]: value,
    });
  };

  const [Delete] = useDelete(`/course-detail/delete-module?moduleId=`);
  const handleDelete = async (e) => {
    Delete(e.target.id, setReload);
  };

  //console.log(data);

  return (
    <Home>
      <div className="py-3  p-3 text-white w-[100%]  relative mb-32">
        <section className="section py-3">
          <div className="text-xl font-medium ">
            <h1>Course Module List</h1>
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
              {/* Display trainers data if available */}
              {data?.data && (
                <div className="table-responsive Ttable">
                  <table className=" table-striped w-[100%] text-center">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Title</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Status</th>

                        <th scope="col">SubModule</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data.data.map((item) => (
                        <tr key={item._id} className="">
                          <td>{item.title}</td>
                          <td>{item?.duration}</td>

                          <td>{item.status === 1 ? "Active " : "Inactive"}</td>
                          <td>{item.subModule.length}</td>

                          <td className="flex gap-2 items-center justify-center">
                            {/* Action links for each trainer */}
                            <button className="btn ">
                              <Link
                                to={`${ModuleUrl}/${item.id}/sub-module`}
                                className="py-2 px-3 rounded-md view-icon text-white"
                                id={item.id}
                              >
                                <i id={item.id} className="bi bi-eye-fill"></i>
                              </Link>
                            </button>
                            <Link
                              className="py-2 px-3 rounded-md edit-icon"
                              to={`/courses/${item.id}/module/edit/${item.id}`}
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
                  <p className="text-white">Title</p>
                  <input
                    onChange={handleChange}
                    required
                    name="title"
                    value={params?.title}
                    placeholder="Title"
                    type="text"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Duration</p>
                  <input
                    onChange={handleChange}
                    required
                    placeholder="Duration"
                    name="duration"
                    value={params?.duration}
                    type="text"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">File Url</p>
                  <input
                    onChange={handleChange}
                    required
                    placeholder="File"
                    name="fileUrl"
                    value={params?.fileUrl}
                    type="url"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Video Url</p>
                  <input
                    onChange={handleChange}
                    required
                    placeholder="Vedio"
                    name="videoUrl"
                    value={params?.videoUrl}
                    type="url"
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
                    required
                    name="sequence"
                    placeholder="Sequence"
                    value={params?.sequence}
                    type="number"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Description</p>
                  <textarea
                    type="text"
                    required
                    placeholder="Description"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                    value={params?.description}
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* {similar fields} */}
                <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                  Add Module
                </button>
              </form>
            </div>
          )}
        </div>
        {/* Card to show and add subcategories */}
      </div>
    </Home>
  );
};

export default AddModules;
