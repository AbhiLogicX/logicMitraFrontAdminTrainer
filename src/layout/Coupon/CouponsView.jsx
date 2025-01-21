import React from "react";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { useFetch } from "../../hooks/useFetch";
import { useDelete } from "../../hooks/useDelete";

const CouponsView = () => {
  const [data, error, loading, setReload] = useFetch("/coupon/", true);

  const [Delete] = useDelete(`/coupon/delete-coupon/`);

  const handleDelete = async (e) => {
    Delete(e.target.id, setReload);
  };

  return (
    <Home>
      <div className="md:pl-3  p-3 text-white w-[100%]  courses-page mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium   d-flex justify-between items-center">
            <h1>Coupon List</h1>
            <div className="">
              <Link
                to="/coupon/add"
                className="Add-btn px-3 py-2 rounded-md  me-2"
              >
                Add Coupon
              </Link>
            </div>
          </div>
        </section>
        <div className=" w-[100%]">
          <div className=" ">
            {loading && <h1 className="text-white">Loading...</h1>}
            {error && <h1 className="text-white">{error.message}</h1>}
            {data?.data && (
              <div className="table-responsive Ttable mt-4  overflow-y-auto Table-overflow">
                <table className=" table-striped w-[100%]">
                  <thead>
                    <tr className="Thead">
                      <th scope="col">Title</th>
                      <th scope="col">Code</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Visibility</th>
                      <th scope="col">Course</th>
                      <th scope="col">Trainer</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {loading ? (
                    <h1 className="text-white">Loading...</h1>
                  ) : (
                    <tbody className="table-group-divider">
                      {data?.data?.map((item) => (
                        <tr key={item.id} className="Tbody">
                          <td>{item.title}</td>
                          <td>{item?.code}</td>
                          <td> {item?.amount}</td>
                          <td>{item?.visibility}</td>
                          <td>
                            {item?.course?.ctitle ? item?.course?.ctitle : "NA"}
                          </td>
                          <td>
                            {item?.course?.ctrainer?.sname
                              ? item?.course?.ctrainer?.sname
                              : "NA"}
                          </td>

                          <td className="flex gap-2 items-cente justify-center">
                            <Link
                              className=" py-2 px-3 rounded-md edit-icon"
                              to={`/coupon/edit/${item.id}`}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                            <Link
                              className="  py-2 px-3 rounded-md delete-icon "
                              onClick={handleDelete}
                              id={item.id}
                            >
                              <i id={item.id} className="bi bi-trash3"></i>
                            </Link>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Home>
  );
};

export default CouponsView;
