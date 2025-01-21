import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const BatchTrainer = ({ TrainerData }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    setdata(TrainerData);
  }, [TrainerData]);

  //console.log(data?.data)
  return (
    <div className="my-3">
      {data?.data?.batches?.length === 0 ? (
        <>
          <div className="text-white px-2 py-3 "> No Batches Data Found</div>
        </>
      ) : (
        <div className="px-2 py-3 ">
          <div className="">
            <div className="flex justify-between items-center my-2">
              <h1 className="heading "> Batch Details</h1>
              <button className="btn-seeAll px-4 py-1 text-sm"> See All</button>
            </div>
            <div className=" ">
              {/* {loading && <h1 className="text-black">Loading...</h1>}
          {error && <h1 className="text-black">{error.message}</h1>}
          
          */}

              <div className="table-responsive Ttable h-[500px] overflow-y-auto Table-overflow">
                <table className=" table-striped w-[100%]">
                  <thead className="Thead">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Image</th>
                      <th scope="col">Seats</th>
                      <th scope="col">Sequence</th>
                      <th scope="col">Time</th>
                      <th scope="col"> Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.batches.map((item) => {
                      //console.log(item)
                      return (
                        <>
                          <tr className="Tbody" key={item.id}>
                            <td>{item?.btitle}</td>
                            <td>
                              <div className="w-10 h-10">
                                <img
                                  src={
                                    data?.data?.bimage === "" ||
                                    !data?.data?.bimage
                                      ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                                      : `https://api.logicmitra.com:8086/uploads/batches/${data?.data?.bimage}`
                                  }
                                  alt="image"
                                  className="w-[100%] h-[100%]   object-cover "
                                />
                              </div>
                            </td>
                            <td>{item?.bseats}</td>
                            <td>{item?.bsequence}</td>
                            <td>{item?.btime}</td>
                            <td className="flex flex-row">
                              {" "}
                              {moment(item?.bstartdate).format("DD/MM/YYYY")}
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

export default BatchTrainer;
