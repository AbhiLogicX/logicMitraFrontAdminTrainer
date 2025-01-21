import { useEffect, useState } from "react";
import { PiCertificateBold } from "react-icons/pi";
const CourseDetails = ({CourseData}) => {

  const [data , setdata]=useState()


  
  useEffect(()=>{
setdata(CourseData)
  },[CourseData])
  
  const [courselist, setcourse] = useState("all");

  return (
    <>
      <div className="overflow-hidden">
        <div className="">
          <ul className="flex gap-10  px-2 py-3  my-2 ">
            <li
              className={`p-1 ${
                courselist === "all" ? " course-all" : "border-b-2"
              } cursor-pointer text-center   `}
              onClick={() => setcourse("all")}
            >
              All
            </li>
            <li
              className={`p-1 ${
                courselist === "active" ? " course-active" : "border-b-2"
              } cursor-pointer text-center  `}
              onClick={() => setcourse("active")}
            >
              Active
            </li>
            <li
              className={`p-1 ${
                courselist === "completed" ? " course-completed" : "border-b-2"
              } cursor-pointer text-center   `}
              onClick={() => setcourse("completed")}
            >
              Completed
              <div></div>
            </li>
          </ul>
        </div>

        {/* courses list  */}

        <div className="md:p-2">
          {courselist === "all" ? (
            <>
              {/* All courses data  */}
              <div className="box">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 space-y-5 items-center ">
                  <div className=" ">
                    <h1 className="font-medium text-xl">All Courses</h1>
                    <p>
                      Details on which course student have enrolled and about
                      their active1 and complete course
                    </p>
                  </div>

                  <div className=" flex flex-col course-card relative ">
                    <div className="w-20 h-20 mx-auto absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <img
                        src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                        alt="image"
                        className="w-[100%] h-[100%] rounded-full object-cover mx-auto image1"
                      />
                    </div>

                    <div className="pt-10 space-y-2">
                      <ul>
                        <h1>Full Stack Web Development</h1>
                        <li>Trained By : pramod Shukla</li>
                        <li>Trained By : pramod Shukla</li>
                        <li>Trained By : pramod Shukla</li>
                      </ul>

                      <div className="flex flex-col items-center justify-center gap-2">
                        <PiCertificateBold className="text-yellow-500" />
                        <p className="text-center"> Ceatified By 20/12/12</p>
                      </div>
                    </div>
                  </div>
                  
                 
                 
                 
                 
                  
                </div>
              </div>
            </>
          ) : courselist === "active" ? (
            <>
              {/* Active1 data */}

              <div className="box">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 space-y-5 items-center ">
                  <div className=" ">
                    <h1 className="font-medium text-xl">Active Courses</h1>
                    <p>
                      Details on which course student have enrolled and about
                      their active1 and complete course
                    </p>
                  </div>
                  <div className=" flex flex-col course-card relative ">
                    <div className="w-20 h-20 mx-auto absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <img
                        src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                        alt="image"
                        className="w-[100%] h-[100%] rounded-full object-cover mx-auto image1"
                      />
                    </div>

                    <div className="pt-10 space-y-2">
                      <ul>
                        <h1>Full Stack Web Development</h1>
                        <li>Trained By : pramod Shukla</li>
                        <li>Trained By : pramod Shukla</li>
                        <li>Trained By : pramod Shukla</li>
                      </ul>

                      <div className="flex flex-col items-center justify-center gap-2">
                        <PiCertificateBold className="text-yellow-500" />
                        <p className="text-center"> Ceatified By 20/12/12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : courselist === "completed" ? (
            <>
              {/* completed data         */}

              <div className="box">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 space-y-5 items-center ">
                  <div className=" ">
                    <h1 className="font-medium text-xl">Completed Courses</h1>
                    <p>
                      Details on which course student have enrolled and about
                      their active1 and complete course
                    </p>
                  </div>
                  <div className=" flex flex-col course-card relative ">
                    <div className="w-20 h-20 mx-auto absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <img
                        src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                        alt="image"
                        className="w-[100%] h-[100%] rounded-full object-cover mx-auto image1"
                      />
                    </div>

                    <div className="pt-10 space-y-2">
                      <ul>
                        <h1>Full Stack Web Development</h1>
                        <li>Trained By : pramod Shukla</li>
                        <li>Trained By : pramod Shukla</li>
                        <li>Trained By : pramod Shukla</li>
                      </ul>

                      <div className="flex flex-col items-center justify-center gap-2">
                        <PiCertificateBold className="text-yellow-500" />
                        <p className="text-center"> Ceatified By 20/12/12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
