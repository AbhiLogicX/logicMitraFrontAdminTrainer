import React, { useEffect } from "react";
import { FaClock, FaLink } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsPersonVideo3 } from "react-icons/bs";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import BEnrollStudent from "../../components/Batchshowmore/BEnrollStudent";
import BTrainerDetails from "../../components/Batchshowmore/BTrainerDetails";
import { useFetch } from "../../hooks/useFetch";
import Home from "../../Home";
import { properties } from "../../config/properties";
import axios from "axios";
const BatchesDetails = () => {
  const { id } = useParams();
  //console.log(id);
  const [data, error, loading] = useFetch(
    `/batches/batch-detail?batchId=${id}`
  );

  // console.log(data);
  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  return (
    <>
      <Home>
        <section className="text-white px-3 sm:p-3 col ">
          <section className="section mb-3">
            <div className="text-xl font-medium">
              <h1 className="heading">Batch Details</h1>
            </div>
          </section>

          {/* Display loading message while data is being fetched */}
          {loading && <h1 className="text-white">Loading...</h1>}
          {/* Display error message if there's an error */}
          {error && <h1 className="text-white">{error.message}</h1>}
          {/* Display trainers data if available */}

          {!data?.data ? null : (
            <>
              <div className="box">
                <div className="space-y-4 md:space-x-4 md:flex items-center">
                  <div className="md:w-[40%] h-52">
                    <img
                      src={`${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/batch/${data?.data?.bimage}`}
                      alt="batch logo"
                      className="w-[100%] h-[100%]  image1 rounded-md"
                    />
                  </div>

                  <div className="p-2 space-y-2">
                    <button className="Batch px-3 py-1 rounded-md font-medium capitalize">
                      {data?.data?.btitle}
                    </button>

                    <h1 className="text-xl font-extrabold">
                      {data?.data?.bcourse.ctitle}{" "}
                    </h1>
                    <div className="">
                      <ul>
                        <li className="flex items-center gap-2 mb-1">
                          {" "}
                          <PiStudent /> Enrolled Student :{" "}
                          {data?.data?.student.length}
                        </li>
                        <li className="flex items-center gap-2 mb-1">
                          <MdAssignment /> Batch started on :{" "}
                          {data?.data?.bstartdate}
                        </li>
                        <li className="flex items-center gap-2 mb-1">
                          <FaClock /> Class time : {data?.data?.btime}
                        </li>
                        <li className="flex items-center gap-2 mb-1">
                          <FaLink />
                          Meeting Link : {data?.data?.meetLink}
                        </li>
                        <li className="flex items-center gap-2 mb-1">
                          <BsPersonVideo3 />
                          Trainer : {data?.data?.btrainer?.sname}{" "}
                          <Link
                            to={`/trainers/view/${data?.data?.btrainer?.id}`}
                          >
                            <p className="underline text-yellow-500 cursor-pointer">
                              get details...
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-start justify-between space-y-8">
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

                {show ? (
                  <>
                    <BEnrollStudent BstudentData={data?.data} />
                    {/* <BTrainerDetails BtrainerData={data?.data?.btrainer} /> */}
                  </>
                ) : null}
              </div>
            </>
          )}
        </section>
      </Home>
    </>
  );
};

export default BatchesDetails;
