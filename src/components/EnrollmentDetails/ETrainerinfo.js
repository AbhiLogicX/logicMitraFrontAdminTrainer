import { useState } from "react";
import { BiChevronUp } from "react-icons/bi";

import { BiChevronDown } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { PiStudentFill } from "react-icons/pi";
import { BsChatRightQuote } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { FaDownload, FaRegEdit, FaShareAlt } from "react-icons/fa";
import { properties } from "../../config/properties";
const ETrainerInfo = ({ trainer }) => {
  //console.log(trainer);
  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  return (
    <>
      <section className="text-white mb-24">
        <div className="flex justify-between items-center border-t-2 border-b-2 p-3 border-yellow-500  mb-3">
          <h1>Trainer Details</h1>

          <ul className="flex items-center gap-3">
            <li className="view-icon p-2 rounded-md">
              <FaRegEdit />
            </li>
            <li className="edit-icon p-2 rounded-md">
              <FaDownload />
            </li>
            <li className="delete-icon p-2 rounded-md">
              <FaShareAlt />
            </li>
          </ul>
        </div>

        <div className="p-3">
          <div className="box space-y-4">
            <div className="space-y-4 sm:space-y-0 sm:flex  items-center gap-4">
              <div className="w-40 h-40 ">
                <img
                  src={
                    trainer?.trainerid?.sprofilepicUrl === "" ||
                    !trainer?.trainerid?.sprofilepicUrl
                      ? "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${trainer?.trainerid?.sprofilepicUrl}`
                  }
                  alt="image"
                  className="w-[100%] h-[100%] rounded-full image1 object-cover "
                />
              </div>

              <ul className="space-y-1">
                <h1 className="font-extrabold border-b-2 border-yellow-500 text-yellow-500">
                  {trainer?.trainerid?.sname}
                </h1>
                <li className="flex  items-center gap-2">
                  <TiStarFullOutline className="text-xs " />{" "}
                  {trainer?.trainerid?.srating} Trainer Ratings{" "}
                </li>
                <li className="flex  items-center gap-2">
                  {" "}
                  <PiStudentFill className="text-xs " /> 1750 Students
                </li>
                <li className="flex  items-center gap-2">
                  <BsChatRightQuote className="text-xs " />{" "}
                  {trainer?.trainerid?.courses?.length} Courses{" "}
                </li>
                <li className="flex  items-center gap-2">
                  <PiCertificateFill className="text-xs " /> 1750 Review
                </li>
              </ul>
            </div>

            <div className="   space-y-2 ">
              <h1 className="heading1"> Description:</h1>

              <div className="flex flex-col items-start justify-between space-y-8">
                <p>
                  {show
                    ? trainer?.trainerid?.sintro
                    : `${trainer?.trainerid?.sintro?.slice(0, 300)}...`}
                </p>

                <button className="" onClick={() => showmoreclick()}>
                  {show ? (
                    <div className="flex items-center  text-sm gap-1 w-[100%]">
                      {" "}
                      <BiChevronUp className="text-yellow-600 text-2xl font-extrabold" />{" "}
                      Show less
                    </div>
                  ) : (
                    <div className="flex items-center  text-sm gap-1  w-[100%]">
                      {" "}
                      <BiChevronDown className="text-yellow-600 text-2xl font-extrabold" />{" "}
                      Show more
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ETrainerInfo;
