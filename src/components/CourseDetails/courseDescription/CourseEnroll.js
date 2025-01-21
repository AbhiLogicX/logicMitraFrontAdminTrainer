import { FaClock, FaLayerGroup } from "react-icons/fa";
import moment from "moment";
import { MdAssignmentAdd } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { VscTriangleRight } from "react-icons/vsc";
import { useEffect, useState } from "react";
import RatingStars from "../../RatingStar.js/RateStars";
import FormatPrice from "../../FormatPrice/FormatPrice";
import { properties } from "../../../config/properties";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const CourseEnroll = ({ CourseData }) => {
  const [data, setdata] = useState();
  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  useEffect(() => {
    setdata(CourseData);
  }, [CourseData]);

  const odd = [];
  const even = [];

  console.log(CourseData);

  for (let i = 0; i <= data?.data?.cmodules?.length; i++) {
    if (data?.data?.cmodules[i] === undefined) {
      continue;
    }
    if (i === 0) {
      even.push(data?.data?.cmodules[i]);
    } else if (i % 2 === 0) {
      odd.push(data?.data?.cmodules[i]);
    } else {
      odd.push(data?.data?.cmodules[i]);
    }
  }

  return (
    <>
      <section className="text-white py-3 sm:p-3 space-y-4 relative">
        {/* //decription  */}
        <h1 className="heading text-white text-2xl">Couse Details</h1>

        <div className="Cbox">
          <div className="space-y-1  w-[100%] lg:w-[50%]">
            <h1 className="font-bold text-xl"> {data?.data?.ctitle}</h1>
            <p className="flex items-center">
              <FaClock style={{ marginRight: 5 }} />
              {`Duration - ${data?.data?.cduration} Months `}
            </p>

            <p className="flex items-center">
              <FaLayerGroup style={{ marginRight: 5 }} />
              {`Category - ${
                data?.data?.ccategory?.title ? data.data.ccategory.title : "NA"
              }`}
            </p>

            <p className="flex items-center">
              <FaLayerGroup style={{ marginRight: 5 }} />
              {`Sub-Category - ${
                data?.data?.ccategory?.title ? data.data.ccategory.title : "NA"
              }`}
            </p>

            <ul>
              <li>
                <span className="Text font-bold flex gap-2">
                  {data?.data?.ratings}
                  {
                    <RatingStars
                      stars={data?.data?.ratings}
                      reviews={"vish"}
                      text="enrolled student reviews"
                    />
                  }
                </span>
              </li>
              <li className="font-bold">
                <span>Trained By :</span>
                <span className="Text"> {data?.data?.ctrainer?.sname} </span>
              </li>
              <li className=""> Languages : English , Hindi</li>
              <li>
                {`Start Date: ${moment(data?.data?.AccessPeriodDayd).format(
                  "DD-MMM-YYYY"
                )}`}
              </li>
            </ul>
          </div>
        </div>

        {/* what will you learn  */}
        <div className="Cbox space-y-2 w-[100%] lg:w-[60%]">
          <h1 className="font-bold Text "> What will you learn :</h1>
          <ul className="grid grid-cols-1  sm:grid-cols-2 gap-1">
            <>
              {data?.data?.cmodules?.map((ele) => (
                <li className="flex items-center gap-1">
                  <VscTriangleRight className="text-sm Text" /> {ele.title}
                </li>
              ))}
            </>
          </ul>
        </div>

        {/* what will you learn  */}
        <div className="Cbox space-y-2 w-[100%] lg:w-[60%]">
          <h1 className="font-bold Text "> Description :</h1>
          <div className=" justify-between">
            <p>
              {show
                ? `${CourseData?.data?.cdescription.slice(0, 300)} ... `
                : `${CourseData?.data?.cdescription}`}
            </p>

            <button className="" onClick={() => showmoreclick()}>
              {show ? (
                <div className="flex items-center  text-sm gap-1 w-[100%]">
                  <BiChevronDown className="text-yellow-600 text-2xl font-extrabold" />
                  Show more
                </div>
              ) : (
                <div className="flex items-center  text-sm gap-1  w-[100%]">
                  <BiChevronUp className="text-yellow-600 text-2xl font-extrabold" />
                  Show less
                </div>
              )}
            </button>
          </div>
        </div>

        {/* enroll now box car  */}

        <div className="box space-y-1 md:w-[100%]  lg:w-[30%] lg:absolute lg:top-0 lg:right-5">
          <div className="">
            <img
              src={
                data?.data?.ccoverimage === "" || !data?.data?.ccoverimage
                  ? "https://img.freepik.com/free-photo/perspective-home-desk-white-frame_1258-255.jpg"
                  : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/courses/${data?.data?.ccoverimage}`
              }
              alt="course CoverImg "
              className="rounded-lg  border-2 border-yellow-500"
              style={{
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <h1 className="font-bold text-xl"> {data?.data?.ctitle} </h1>
          <ul className="flex gap-2 font-bold">
            <li className="Text">
              {<FormatPrice price={data?.data?.cofferfees} />}
            </li>
            <li>
              <del>{data?.data?.cfees}</del>
            </li>
          </ul>
          <ul className="">
            <h1 className="font-bold text-lg"> This Course includes :</h1>
            <li className="flex items-center gap-2">
              <FaClock className="text-sm" /> {data?.data?.cduration}
            </li>
            <li className="flex items-center gap-2">
              <MdAssignmentAdd className="text-sm" />
              {data?.data?.cassignments} Assignments
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <FaProjectDiagram className="text-sm" /> {data?.data?.cprojects}{" "}
              Real-time Project
            </li>
            <li className="flex items-center gap-2">
              <IoMdPhonePortrait className="text-sm" /> Access on Mobile and
              Laptop
            </li>
            {data?.data?.ccetification === "true" ? (
              <li className="flex items-center gap-2">
                <GrCertificate className="text-sm" /> Certification of
                completion
              </li>
            ) : null}
          </ul>

          <button className="enroll-btn w-[100%] rounded-sm py-2 mt-3">
            {" "}
            Enroll Now{" "}
          </button>
        </div>
      </section>
    </>
  );
};

export default CourseEnroll;
