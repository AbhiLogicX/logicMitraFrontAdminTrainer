import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormatPrice from "../../FormatPrice/FormatPrice";
import { properties } from "../../../config/properties";

const CourseTrainer = ({ TrainerData }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    setdata(TrainerData);
  }, [TrainerData]);

  //console.log(data?.data?.courses)
  const navigate = useNavigate();
  const handleRedirection = (id) => {
    navigate(`/courses/view/${id}`);
  };

  return (
    <>
      <section className="my-3">
        {/* <div className="flex justify-between items-center my-2 px-2 py-3">
          <h1 className="heading "> Courses</h1>
          <button className="btn-seeAll px-4 py-1 text-sm"> See All</button>
        </div> */}

        {data?.data?.courses?.length === 0 ? (
          <>
            <div className="text-white">No Courses Data Found</div>
          </>
        ) : (
          <>
            <div className="box">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
                {data?.data?.courses.map((elm) => {
                  return (
                    <>
                      <div
                        className="box p-0 space-y-1 cursor-pointer"
                        onClick={() => {
                          handleRedirection(elm._id);
                        }}
                      >
                        <img
                          src={
                            elm.ccoverimage === "" || !elm.ccoverimage
                              ? "https://img.freepik.com/free-photo/perspective-home-desk-white-frame_1258-255.jpg"
                              : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/courses/${elm.ccoverimage}`
                          }
                          alt="image"
                          className="w-[100%] h-44 border-b-2 rounded-md  border-yellow-500 "
                        />
                        <div className="px-3 py-1">
                          <h1 className="text-xl font-extrabold">
                            {elm.ctitle}
                          </h1>
                          <ul className="flex gap-2 font-bold">
                            <li className="Text">
                              {<FormatPrice price={elm.cfees} />}
                            </li>
                            <li>
                              {" "}
                              <del>{elm.cfees * 2}</del>
                            </li>
                            <li className="Text"> {elm.cofferfees} Offers </li>
                          </ul>
                          <div className="">
                            <ul className="flex justify-between items-center border-t-2 border-yellow-500 w-[100%] mt-2 p-1">
                              <li className=" gap-2 flex justify-between items-center">
                                {elm?.cmodules?.length} Topics
                              </li>
                              <li className=" gap-2 flex justify-between items-center">
                                {elm.cduration} Months
                              </li>
                              <li className=" gap-2 flex justify-between items-center">
                                ⭐{elm.ratings}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CourseTrainer;
