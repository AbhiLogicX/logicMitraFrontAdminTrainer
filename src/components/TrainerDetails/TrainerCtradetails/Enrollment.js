import { useEffect, useState } from "react";
import moment from "moment";
import { Details } from "@mui/icons-material";

const EnrollTrainer = ({ TrainerData, ...details }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    setdata(TrainerData);
  }, [TrainerData]);

  console.log("--->", details?.enrollmentData);

  return (
    <>
      {details?.enrollmentData?.data?.length === 0 ? (
        <>
          <div className="text-white px-2 py-3">
            {" "}
            No Enrolled Courses Data Found
          </div>
        </>
      ) : (
        <div className="my-3">
          <div className="">
            {/* <div className="flex justify-between items-center my-2">
              <h1 className="heading "> Enroll Courses</h1>
              <button className="btn-seeAll px-4 py-1 text-sm"> See All</button>
            </div> */}
            <div className="card-body ">
              {/* {loading && <h1 className="text-black">Loading...</h1>}
          {error && <h1 className="text-black">{error.message}</h1>}
          
          */}

              <div className="table-responsive Ttable  overflow-y-auto Table-overflow">
                <table className=" table-striped w-[100%]">
                  <thead className="Thead">
                    <tr>
                      <th scope="col">title</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details?.enrollmentData?.data?.map((item) => {
                      //console.log(item)
                      return (
                        <>
                          <tr className="Tbody" key={item.id}>
                            <td>{item?.courseid?.ctitle}</td>
                            <td>{item?.studentid?.sname}</td>
                            <td>{item?.paymode}</td>
                            <td>{item?.payamount}</td>
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
    </>
  );
};

export default EnrollTrainer;
