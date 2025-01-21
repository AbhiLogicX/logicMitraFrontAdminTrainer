import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const TransactionTrainer = ({ TrainerData }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    setdata(TrainerData);
  }, [TrainerData]);

  //console.log(data?.data?.walletTranscation)

  return (
    <div className="my-3">
      {data?.data?.walletTranscation?.length === 0 ? (
        <>
          <div className="text-white px-2 py-3 ">
            {" "}
            No Transaction Data Found
          </div>
        </>
      ) : (
        <div className="">
          <div className="">
            {/* <div className="flex justify-between items-center my-2">
              <h1 className="heading "> Transaction Details</h1>
              <button className="btn-seeAll px-4 py-1 text-sm"> See All</button>
            </div> */}
            <div className="card-body ">
              {/* {loading && <h1 className="text-black">Loading...</h1>}
          {error && <h1 className="text-black">{error.message}</h1>}
          
          */}

              <div
                className="table-responsive Ttable  overflow-y-auto Table-overflow
            "
              >
                <table className=" table-striped w-[100%]">
                  <thead className="Thead">
                    <tr>
                      <th scope="col">Reciever</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.walletTranscation.map((item) => {
                      //console.log(item)
                      return (
                        <>
                          <tr className="Tbody" key={item.id}>
                            <td>{item?.receiverId?.sname}</td>
                            <td>{item?.cardType}</td>
                            <td>{item?.transmethod}</td>
                            <td>{item?.amount}</td>
                            <td className="flex flex-row">
                              {" "}
                              {moment(item?.date).format("DD/MM/YYYY")}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTrainer;
