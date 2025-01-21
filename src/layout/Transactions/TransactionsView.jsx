import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { useFetch } from "../../hooks/useFetch";
import { useDelete } from "../../hooks/useDelete";
import { useAuth } from "../../context/auth";

const TransactionView = () => {
  const [auth, setAuth] = useAuth();
  const [params, setParams] = useState({
    fromDate: "",
    toDate: "",
  });

  const [data, error, loading, setReload] = useFetch(
    `/wallet/wallet-transction-user-history?uId=${
      auth?.userId ? auth?.userId : auth?.user
    }&fromDate=${params?.fromDate}&toDate=${params.toDate}`,
    true
  );
  //   fromDate=${params?.fromDate}&toDate=${params.toDate}
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setReload(false);
  };

  return (
    <Home>
      <div className="px-3 text-white w-[100%]  courses-page mb-16">
        <section className="section mb-3 mt-1">
          <div className="text-xl font-medium   d-flex justify-between items-center">
            <h1>Transactions</h1>
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
                      <th scope="col">Amount</th>
                      <th scope="col">Transaction Type</th>
                      <th scope="col">Transaction Date</th>
                      <th scope="col">Transaction Method</th>
                      <th scope="col">Reciver</th>
                      <th scope="col">Status</th>
                      <th scope="col">Remark</th>
                    </tr>
                  </thead>
                  {loading ? (
                    <h1 className="text-white">Loading...</h1>
                  ) : (
                    <tbody className="table-group-divider">
                      {data?.data?.walletTranscation?.map((item) => (
                        <>
                          {item.remark === "Enrollment Fees" &&
                          item?.cardType === "debit" ? null : (
                            <tr key={item.id} className="Tbody">
                              <td>{item.amount}</td>
                              <td>{item?.cardType}</td>
                              <td> {item?.date.substring(0, 10)}</td>
                              <td>{item?.transmethod}</td>
                              <td>{item.receiverId?.sname}</td>

                              <td>
                                {item.status === "1" ? "Compeleted" : "Pending"}
                              </td>
                              <td>{item.remark}</td>
                            </tr>
                          )}
                        </>
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

export default TransactionView;
