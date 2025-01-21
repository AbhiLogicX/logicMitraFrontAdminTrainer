import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { FaLocationDot } from "react-icons/fa6";

import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import CourseTrainer from "../../components/TrainerDetails/TrainerCtradetails/Courses";
import AboutTrainer from "../../components/TrainerDetails/TrainerCtradetails/About";
import TransactionTrainer from "../../components/TrainerDetails/TrainerCtradetails/Transaction";
import EnrollTrainer from "../../components/TrainerDetails/TrainerCtradetails/Enrollment";
import ReviewTrainer from "../../components/TrainerDetails/TrainerCtradetails/Review";
import { CgCalendarDates } from "react-icons/cg";
import BatchTrainer from "../../components/TrainerDetails/TrainerCtradetails/BatchTrainer";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import Home from "../../Home";
import { properties } from "../../config/properties";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStepsFill } from "react-icons/pi";
import { BiSolidComponent } from "react-icons/bi";

function ViewTrainerInfo() {
  const { id } = useParams();
  const [data, error, loading] = useFetch(`/user/details?userID=${id}`, id);

  const [CTR, setCTR] = useState("courses");
  const [
    enrollmentData,
    enrollmentErr,
    enrollmentLoading,
    ErollmentReloadData,
  ] = useFetch(`/enroll/trainer-student?trainId=${id}`);
  // console.log("enrollmentData--->", enrollmentData.data.length);
  // //console.log(CTR);
  // console.log(" trainers data---->", enrollmentData.data);
  // //console.log(data?.data?.sgender.charAt(0).toLowerCase());

  //* fetch the city list
  const [CityList, error3, loading3] = useFetch("/address/city-list", true);

  return (
    <>
      <Home>
        {loading && <h1 className="text-white ">Loading...</h1>}
        {error && <h1 className="text-white ">{error.message}</h1>}

        {data?.data && (
          <>
            <div className="text-white py-3 sm:p-3 col space-y-4 mb-16">
              <h1 className="heading heading1">Trainer's Profile</h1>

              <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 ">
                {/* image profile */}
                <div className=" w-[100%] md:w-[30%]  box p-0  space-y-5 flex-col justify-center items-center content-center align-middle relative">
                  <img
                    src={
                      data?.data?.sbackgroundUrl === "" ||
                      !data?.data?.sbackgroundUrl
                        ? "https://img.freepik.com/free-photo/perspective-home-desk-white-frame_1258-255.jpg"
                        : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${data?.data?.sbackgroundUrl}`
                    }
                    alt="logo"
                    className={`w-[100%] h-44 object-cover  border-b-2 border-yellow-500`}
                    style={{ borderRadius: 9 }}
                  />

                  <div className="py-4 md:py-6">
                    <div className="w-40 h-40  mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                      <img
                        src={
                          data?.data?.sprofilepicUrl === "" ||
                          !data?.data?.sprofilepicUrl
                            ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                            : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${data?.data?.sprofilepicUrl}`
                        }
                        alt="logo"
                        className="w-100 h-100  rounded-full image1 object-cover"
                      />
                    </div>
                  </div>
                  <div className="btn2 font-extrabold w-[90%] text-gray-800  text-center mx-auto my-3 md:my-0 ">
                    {/* <p> ID : {data?.data?.id}</p> */}
                    <p> Name : {data?.data?.sname} </p>
                  </div>
                </div>

                {/* trainer's details name so on */}
                <div className=" w-[100%] md:w-[70%] box space-y-4 ">
                  <ul>
                    <li className="flex items-center gap-2 mb-3">
                      {data?.data?.sgender?.charAt(0).toLowerCase() === "m" ? (
                        <>
                          <IoMdMale className="text-xl" />
                          <p>He / Him</p>
                        </>
                      ) : (
                        <>
                          <IoMdFemale className="text-xl" />
                          <p>She / Her</p>
                        </>
                      )}
                    </li>
                    <li className="flex items-center gap-2 mb-3">
                      <MdOutlineMail className="text-xl" /> {data?.data?.semail}
                    </li>
                    <li className="flex gap-2 items-center mb-3">
                      <CgCalendarDates className="text-xl" /> {data?.data?.sdob}
                    </li>
                    <li className="flex items-center gap-2 mb-3">
                      <FaPhoneAlt className="text-xl" />{" "}
                      {`+91-${data?.data?.smobile}`}
                    </li>
                    <li className="flex items-center gap-2 mb-3">
                      <FaLocationDot className="text-xl" />
                      {data?.data?.scity}, {data?.data?.sstate},{" "}
                      {data?.data?.scountry} ,{data?.data?.spincode}
                    </li>
                  </ul>

                  {/* enroll review and courses experience list */}
                  <ul className="grid grid-cols-2 gap-4 sm:gap-0 sm:flex sm:space-x-4 space-y-0">
                    <li className="small-box px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <FaPeopleGroup className="text-2xl" />{" "}
                        <p className="text-sm font-extrabold">
                          {enrollmentData?.data?.length !== 0
                            ? enrollmentData?.data?.length
                            : 0}
                        </p>
                      </div>
                      <div className="text-xs">Students Enrolled</div>
                    </li>
                    <li className="small-box px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        ⭐{" "}
                        <p className="text-sm font-extrabold">
                          {data?.data?.srating !== 0 ? data.data.srating : 0}
                        </p>
                      </div>
                      <div className="text-xs">Ratings</div>
                    </li>
                    <li className="small-box px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <PiStepsFill className="text-2xl" />
                        <p className="text-sm font-extrabold">
                          {data?.data?.experience !== ""
                            ? data.data.experience
                            : 0}
                        </p>
                      </div>
                      <div className="text-xs">Year experience</div>
                    </li>

                    <li className="small-box px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <BiSolidComponent className="text-2xl" />
                        <p className="text-sm font-extrabold">
                          {data?.data?.courses?.length !== 0
                            ? data.data.courses.length
                            : 0}
                        </p>
                      </div>
                      <div className="text-xs">Total Courses</div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* tabpanel  */}

              <div className="mt-5">
                <div className="overflow-hidden">
                  <ul
                    className="flex justify-around p-2    relative"
                    style={{ borderBottom: "2px solid #04775A" }}
                  >
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("courses")}
                    >
                      <p className="heading1"> Courses</p>
                      <div
                        className={` ${
                          CTR === "courses" ? "TCTR1" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("about")}
                    >
                      <p className="heading1">About</p>
                      <div
                        className={` ${
                          CTR === "about" ? " TCTR2" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("transaction")}
                    >
                      <p className="heading1"> Transaction</p>
                      <div
                        className={` ${
                          CTR === "transaction" ? " TCTR3" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("enrollment")}
                    >
                      <p className="heading1"> Enrollment</p>
                      <div
                        className={` ${
                          CTR === "enrollment" ? " TCTR4" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("review")}
                    >
                      <p className="heading1"> Review</p>
                      <div
                        className={` ${
                          CTR === "review" ? " TCTR5" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("batch")}
                    >
                      <p className="heading1"> Batch</p>
                      <div
                        className={` ${
                          CTR === "batch" ? " TCTR6" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                  </ul>

                  {CTR === "courses" ? (
                    <CourseTrainer TrainerData={data} />
                  ) : CTR === "about" ? (
                    <AboutTrainer
                      TrainerData={data}
                      studentsEnrolled={enrollmentData?.data?.length}
                    />
                  ) : CTR === "transaction" ? (
                    <TransactionTrainer TrainerData={data} />
                  ) : CTR === "enrollment" ? (
                    <EnrollTrainer
                      TrainerData={data}
                      enrollmentData={enrollmentData}
                    />
                  ) : CTR === "batch" ? (
                    <BatchTrainer TrainerData={data} />
                  ) : CTR === "review" ? (
                    <ReviewTrainer TrainerData={data} />
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </Home>
    </>
  );
}

export default ViewTrainerInfo;
