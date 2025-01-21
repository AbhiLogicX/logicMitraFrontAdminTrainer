import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { useFetch } from "../../hooks/useFetch";
import { useDelete } from "../../hooks/useDelete";

const EnquiryView = () => {
  const [params, setParams] = useState({
    fromDate: "",
    toDate: "",
  });

  const [data, error, loading, setReload] = useFetch(
    `/contact?fromDate=${params?.fromDate}&toDate=${params.toDate}`,
    true
  );

  const [Delete] = useDelete(`/contact?id=`);
  // console.log("----->", data);

  const handleDelete = async (e) => {
    Delete(e.target.id, setReload);
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setReload(false);
  };

  return (
    <Home>
      <div className="px-3 text-white w-[100%]  courses-page mb-16">
        <section className="section mb-3 mt-1">
          <div className="text-xl font-medium   d-flex justify-between items-center">
            <h1>Enquiries</h1>
          </div>
          <div className="box mt-3">
            <div className="row">
              <div className="col-12 col-sm-3  flex flex-col">
                <label className="text-white" htmlFor="start-date">
                  From Date
                </label>
                <input
                  type="date"
                  className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                  name="fromDate"
                  id="start-date"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-3  flex flex-col">
                <label className="text-white" htmlFor="start-date">
                  To Date
                </label>
                <input
                  type="date"
                  className="form-control input focus-within:bg-none border-none outline-none focus:bg-none"
                  name="toDate"
                  id="start-date"
                  onChange={handleChange}
                />
              </div>
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
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Mssage</th>
                      <th scope="col">Enquiry Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {loading ? (
                    <h1 className="text-white">Loading...</h1>
                  ) : (
                    <tbody className="table-group-divider">
                      {data?.data?.map((item) => (
                        <tr key={item.id} className="Tbody">
                          <td>{item.name}</td>
                          <td>{item?.email}</td>
                          <td> {item?.phonenumber}</td>
                          <td>{item?.message}</td>
                          <td>{item.createdAt.substring(0, 10)}</td>

                          <td className="flex gap-2 items-cente justify-center">
                            <Link
                              className="py-2 px-3 rounded-md delete-icon "
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

export default EnquiryView;
