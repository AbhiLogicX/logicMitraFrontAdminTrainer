import React from "react";
import { GoClock } from "react-icons/go";
import CourseEnroll from "../../components/CourseDetails/courseDescription/CourseEnroll";
import CourseContent from "../../components/CourseDetails/courseDescription/Coursecontent";
import STdetails from "../../components/CourseDetails/courseDescription/STdetailsreview";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Home from "../../Home";
function ViewCourses() {
  // https://api.logicmitra.com:8086/api/courses/course-detail?courseId=65cf3c311c9ac2fe9015264a

  const { id } = useParams();
  const [data, error, loading] = useFetch(
    `/courses/course-detail?courseId=${id}`,
    id
  );
  // console.log("data ----->", data);
  return (
    <>
      <Home>
        {loading && <h1 className="text-white ">Loading...</h1>}
        {error && <h1 className="text-white ">{error.message}</h1>}

        {data?.data && (
          <>
            <div className="p-3  p-md-3 text-white w-[100%] h-[900px] overflow-y-auto Table-overflow">
              <div className="">
                <CourseEnroll CourseData={data} />
              </div>
              <div className="">
                <CourseContent CourseData={data} />
              </div>

              <div className="">
                <STdetails CourseData={data} />
              </div>
            </div>
          </>
        )}
      </Home>
    </>
  );
}

export default ViewCourses;
