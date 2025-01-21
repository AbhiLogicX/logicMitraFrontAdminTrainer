import React, { useEffect, useState } from "react";
import { UseCourseContext } from "../../context/CourseContext";
import { useFetch } from "../../hooks/useFetch";
import { Link, useLocation, useParams } from "react-router-dom";
import { UsesubcategoriesContext } from "../../context/SubcatContext";
import { useAdd } from "../../hooks/useAdd";
// import swal from "sweetalert";
// import axios from "axios";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import Home from "../../Home";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubModule = () => {
  //*find the modules id through params
  const [fetchedData, setFetchedData] = useState(false);
  const [data, setData] = useState();
  const [loading, setLOading] = useState();
  const [error, setError] = useState();
  const locn = useLocation().pathname.split("/");

  // const SubModuleId = id;

  // todo find the url path to redirect the page
  // console.log(locn);

  const Url = window.location.href;
  const SubModuleUrl = Url.substring(Url.indexOf("/courses/"));

  const { moduleId, setModuleId } = UseCourseContext();
  const { courseId, setCourseId, trainerId, setTrainerId } =
    UsesubcategoriesContext();
  // const [data, error, loading, setReaload] = useFetch(
  //   `/course-detail/course-submodule?moduleId=${locn[4]}`,
  //   moduleId
  // );

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/course-detail/course-submodule?moduleId=${locn[4]}`)
        .then((res) => {
          setData(res?.data);
          setFetchedData(true);
        })
        .catch((err) => {
          setError(err);
        });
    }
    if (!fetchedData) {
      fetchData();
    }
  });

  const [params, setParams] = useState({
    title: "",
    description: "",
    duration: "",
    fileUrl: "",
    videoUrl: "",
    sequence: "",
    course: locn[2],
    module: locn[4],
    status: "1",
  });
  //console.log(params);
  const handleChange = (event) => {
    const { name, value, files, type, id } = event.target;
    if (name === "status") {
      setParams({
        ...params,
        status: id === "active" ? "1" : "0",
      });
    } else {
      setParams({
        ...params,
        [name]: value,
      });
    }
  };
  // const [addData] = useAdd(`/course-detail/create-submodule`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("---->", params);

    try {
      const response = await axios.post(
        `/course-detail/create-submodule`,
        params, // Sending params as JSON
        {
          headers: {
            "Content-Type": "application/json", // Set correct Content-Type for JSON
          },
        }
      );

      // Handle success response
      if (response.status === 200) {
        toast.success("Submodule created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // console.log("Response:", response.data);
      }
    } catch (error) {
      // Handle error response
      toast.error("Failed to create submodule. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error:", error);
    }
  };
  const { Delete } = useDeleteOne(
    `/course-detail/delete-submodule?submoduleId=`
  );
  const handleDelete = async (e) => {
    Delete(e.target.id, SubModuleUrl);
    setFetchedData(false);
  };

  //console.log(moduleId);
  // console.log("---==>", data);
  return (
    <Home>
      <div className="pl-3  p-md-3 text-white w-[100%]  relative">
        <section className="section py-3">
          <div className="text-xl font-medium">
            <h1>Sub Module List</h1>
            <div className="section-header-breadcrumb"></div>
          </div>
        </section>

        {/* Categories Table */}
        <div className="row  space-y-5 lg:space-y-0">
          <div className="col col-lg-7">
            <div className=" ">
              {/* Display loading message while data is being fetched */}
              {loading && <h1 className="text-white">Loading...</h1>}
              {/* Display error message if there's an error */}
              {error && <h1 className="text-white">{error.message}</h1>}
              {/* Display trainers data if available */}
              {data?.data && (
                <div className="table-responsive Ttable ">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Duration</th>

                        <th scope="col">Status</th>
                        <th scope="col">Sequence</th>

                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data?.data?.map((item) => (
                        <tr key={item.title} className="Tbody">
                          <td className=" text-left">{item.title}</td>
                          <td className=" text-left">{item.duration}</td>

                          <td className=" text-left">
                            {item.status === 1 ? "Active " : "Inactive"}
                          </td>
                          <td className=" text-left">{item.sequence}</td>

                          <td className="flex gap-2 items-center">
                            {/* Action links for each trainer */}
                            <Link
                              id={item.id}
                              className=" py-2 px-3 rounded-md bg-danger "
                              onClick={handleDelete}
                            >
                              <i id={item.id} className="bi bi-trash3"></i>
                            </Link>{" "}
                            <Link
                              className="py-2 px-3 rounded-md bg-warning"
                              to={`${SubModuleUrl}/edit/${item.id}`}
                            >
                              <i class="bi bi-pencil-square"></i>
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
          {data?.data && (
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
                    type="text"
                    className="form-control my-2 input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  />
                </div>

                <div className="">
                  <p className="text-white">File Url</p>
                  <input
                    value={params?.fileUrl}
                    onChange={handleChange}
                    required
                    name="fileUrl"
                    type="url"
                    className="form-control my-2 input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  />
                </div>
                <div className="">
                  <p className="text-white">Video Url</p>
                  <input
                    value={params?.videoUrl}
                    onChange={handleChange}
                    required
                    name="videoUrl"
                    type="url"
                    className="form-control my-2 input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  />
                </div>
                <div className="">
                  <p className="text-white">Duration</p>
                  <input
                    value={params?.duration}
                    onChange={handleChange}
                    required
                    name="duration"
                    type="text"
                    className="form-control my-2 input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  />
                </div>

                <div className="">
                  <p className="text-white">Status</p>

                  <div className="d-flex justify-content-start text-white gap-4 align-items-center my-2">
                    <div className=" ">
                      <input
                        defaultChecked
                        type="radio"
                        id="active"
                        name="status"
                        // checked={params?.status === 1}
                        onChange={handleChange}
                      />
                      Active
                    </div>

                    <div className="">
                      <input
                        type="radio"
                        id="inactive"
                        name="status"
                        onChange={handleChange}
                        // checked={params?.status === 0}
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
                    className="form-control my-2 input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  />
                </div>
                <div className="">
                  <p className="text-white">Description</p>
                  <textarea
                    type="text"
                    required
                    className="form-control my-2 input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    value={params?.description}
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* {similar fields} */}
                <button className="btn btn-primary mt-3 w-[100%]">
                  Add Sub Module
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Home>
  );
};

export default SubModule;
