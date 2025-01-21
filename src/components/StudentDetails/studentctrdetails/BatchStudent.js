import { useEffect, useState } from "react";
import moment from "moment";
import { properties } from "../../../config/properties";
const BatchStudent = ({ StudentData }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    setdata(StudentData);
  }, [StudentData]);

  return (
    <>
      {data?.data?.batches?.length === 0 ? (
        <>
          <div className="text-white px-2 py-3 "> No Batches Data Found</div>
        </>
      ) : (
        <div className="px-2 py-3 ">
          <div className="">
            <div className=" ">
              <div className="table-responsive Ttable  overflow-y-auto Table-overflow">
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
                      return (
                        <>
                          <tr className="Tbody" key={item.id}>
                            <td>{item?.btitle}</td>
                            <td className="flex justify-center">
                              <div className="w-10 h-10">
                                <img
                                  src={
                                    item?.bimage === "" || !item?.bimage
                                      ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                                      : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/batch/${item?.bimage}`
                                  }
                                  alt="image"
                                  className="w-[100%] h-[100%] object-cover"
                                />
                              </div>
                            </td>
                            <td>{item?.bseats}</td>
                            <td>{item?.bsequence}</td>
                            <td>{item?.btime}</td>
                            <td className="">
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
    </>
  );
};

export default BatchStudent;
