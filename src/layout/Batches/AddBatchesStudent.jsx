import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";

const AddBatchesStudent = () => {
  // const [bCourseId, setbCourseId] = useState(null);
  // const [fetchedMainData, setFetchedMainData] = useState(true);
  // const [fetchedCourses, setFetchedCourses] = useState(false);

  const { id } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [batchData, setBatchData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    courseFetched: false,
    courseLoading: true,
    cousreErr: false,
    courseErrMsg: "Something went wrong",
    batchFetched: false,
    batchLoading: true,
    batchErr: false,
    batchErrMsg: "Something went wrong",
  });

  useEffect(() => {
    if (!fetchedData.courseFetched && fetchedData.batchFetched) {
      fetchCourseData();
    }
    if (!fetchedData.batchFetched) {
      fetchBatchData();
    }

    async function fetchBatchData() {
      await axios
        .get(`/batches/batch-detail?batchId=${id}`)
        .then((res) => {
          if (res.status === 200) {
            setBatchData(res.data);
            fetchedData.batchFetched = true;
            fetchedData.batchLoading = false;
          } else {
            setBatchData([]);
            fetchedData.batchFetched = false;
            fetchedData.batchLoading = true;
          }
        })
        .catch((err) => {
          setBatchData([]);
          fetchedData.batchFetched = false;
          fetchedData.batchLoading = true;
          fetchedData.batchErr = true;
          fetchedData.batchErrMsg = err?.message
            ? err.message
            : "Something went wrong";
        });
    }

    async function fetchCourseData() {
      await axios
        .get(
          `/enroll/batch-unassign-student?trainId=${batchData?.data?.btrainer?.id}`
        )
        .then((res) => {
          if (res.status === 200) {
            setCourseData(res.data.data);
            fetchedData.courseFetched = true;
            fetchedData.courseLoading = false;
          }
        })
        .catch((err) => {
          fetchedData.cousreErr = true;
          fetchedData.courseFetched = false;
          fetchedData.batchLoading = true;
          fetchedData.courseErrMsg = err?.message
            ? err.message
            : "Something went wrong";
        });
    }
  }, [
    id,
    fetchedData?.courseLoading,
    fetchedData?.courseFetched,
    fetchedData?.batchFetched,
    fetchedData?.batchLoading,
    batchData?.data?.bcourse?._id,
    fetchedData,
    batchData?.data?.btrainer?.id,
  ]);

  // Remove student data from batch
  const removeData = async (e) => {
    try {
      const response = await axios.post(
        `/batches/remove-student?batchId=${id}`,
        {
          studentid: e.target.id,
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message || "Data Removed Successfully");
        // window.location.reload();
        // setReload(false);
        setFetchedData((prevState) => ({
          ...prevState,
          batchFetched: false,
          courseFetched: false,
          courseLoading: true,
          batchLoading: true,
        }));

        // courseFetchData(e.target.id);
      } else {
        toast.warn("Something went wrong!");
      }
    } catch (error) {
      toast.warn("Something went wrong!");
    }
  };

  const addStudentData = async (e) => {
    try {
      const response = await axios.post(`/batches/add-student?batchId=${id}`, {
        studentid: e.target.id,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message || "Student Added Successfully");
        // setReload(false);
        // courseFetchData(e.target.id);
        // window.location.reload();
        setFetchedData((prevState) => ({
          ...prevState,
          batchFetched: false,
          courseFetched: false,
          courseLoading: true,
          batchLoading: true,
        }));
      } else {
        toast.warn("Something went wrong!");
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <Home>
      <div className=" px-4 text-white w-[100%] relative">
        <section className="section mb-3">
          <div className="text-xl font-medium">
            <h1 className="heading">Manage students in batch</h1>
          </div>
        </section>
        <div className="section-header-breadcrumb flex flex-row item-center justify-between box mb-3">
          <h2 className="text-lg font-medium ">
            Batch Name:{" "}
            <span className="text-yellow-600">{batchData?.data?.btitle}</span>
          </h2>
          <div className="vl"></div>
          <h2 className="text-lg font-medium ">
            Course Name:{" "}
            <span className="text-yellow-600">
              {batchData?.data?.bcourse?.ctitle}
            </span>
          </h2>
          <div className="vl"></div>
          <p className="text-lg font-medium ">
            Batch Start Date:{" "}
            <span className="text-yellow-600">
              {batchData?.data?.bstartdate}
            </span>
          </p>
          <div className="vl"></div>
          <p className="text-lg font-medium ">
            Batch Time:{" "}
            <span className="text-yellow-600">{batchData?.data?.btime}</span>
          </p>
          <div className="vl"></div>
          <p className="text-lg font-medium ">
            Batch Seats:{" "}
            <span className="text-yellow-600">{batchData?.data?.bseats}</span>
          </p>
          <div className="vl"></div>
          <p className="text-lg font-medium ">
            Batch Seats Left:{" "}
            <span className="text-yellow-600">
              {batchData?.data?.bseats - batchData?.data?.student?.length}
            </span>
          </p>
        </div>

        <div className="row space-y-5 lg:space-y-0">
          <div className="col col-lg-6">
            <div>
              {fetchedData.batchLoading && (
                <h1 className="text-white">Loading...</h1>
              )}
              {fetchedData.batchErr && (
                <h1 className="text-white">{fetchedData.batchErrMsg}</h1>
              )}

              <h1 className="text-xl font-medium mt-3 mb-2 heading">
                Batch Students
              </h1>

              {batchData && (
                <div className="table-responsive Ttable">
                  <table className="table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Name</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {batchData?.data?.student?.map((item, index) => (
                        <tr key={index} className="Tbody">
                          <td>{item.sname}</td>
                          <td className="flex gap-2 items-center justify-center">
                            <Link
                              className="py-2 px-3 rounded-md view-icon text-white"
                              id={item.id}
                              onClick={removeData}
                            >
                              Remove
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

          {!fetchedData.courseLoading && (
            <div className="col-lg-6 lg:px-5">
              <h1 className="text-xl font-medium heading mt-3 mb-2">
                Course Students
              </h1>
              <div className="table-responsive Ttable">
                <table className="table-striped w-[100%]">
                  <thead>
                    <tr className="Thead">
                      <th scope="col">Name</th>
                      <th scope="col">Enroll Date</th>
                      <th scope="col">Add</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {courseData?.map((item, index) => (
                      <tr key={index} className="Tbody">
                        <td>{item?.studentid?.sname}</td>
                        <td>{item?.enrolldate.substring(0, 10)}</td>
                        <td className="flex gap-2 items-center justify-center">
                          <Link
                            className="py-2 px-3 rounded-md view-icon text-white"
                            id={item?.studentid?._id}
                            onClick={addStudentData}
                          >
                            Add
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Home>
  );
};

export default AddBatchesStudent;
