import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsChatRightQuote } from "react-icons/bs";
import { PiCertificateFill, PiStudentFill } from "react-icons/pi";
import { TiStarFullOutline } from "react-icons/ti";
import { properties } from "../../../config/properties";

const STdetails = ({ CourseData }) => {
  const [data, setdata] = useState();
  useEffect(() => {
    setdata(CourseData);
  }, [CourseData]);

  const coursesByTrainer =
    data?.data?.ctrainer?.creviews?.length !== null &&
    data?.data?.ctrainer?.creviews?.length !== undefined &&
    data?.data?.ctrainer?.creviews?.length !== 0
      ? data.data.ctrainer.creviews.length
      : 0;

  //console.log(data?.data?.ctrainer);

  const content1 =
    " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis sequi deleniti fugiat sed ipsam commodi exercitationem amet maiores, esse provident cumque! Incidunt eos quibusdam illo suscipit nulla, aspernatur debitis maiores veritatis deleniti placeat laboriosam asperiores labore maxime veniam amet sequi, voluptatibus cumque eius dicta harum officiis iure eligendi dolorum rem. Dolore, alias! Porro temporibus quaerat reiciendis, praesentium consequatur ea voluptas magni saepe repudiandae ipsa illo debitis voluptatem vero velit culpa, deleniti distinctio alias! Praesentium, error aliquid cum perspiciatis officia molestias tempore. Nulla laborum rerum id repellat aut architecto vero voluptates voluptatum obcaecati beatae ut aliquam maiores, corporis, placeat amet numquam totam dolore. Quam molestias corporis architecto eligendi cupiditate eaque, earum repellendus quaerat commodi numquam nulla soluta voluptatibus aperiam, quos id facilis vitae et voluptatum officiis incidunt. Ipsum, autem corporis officiis atque non reprehenderit quis nemo, impedit harum aspernatur consequuntur et dolorem! Culpa, nihil. Dolorum, aliquam. Numquam rem nihil recusandae molestias fuga quisquam cum culpa eum quia pariatur, consectetur animi magnam assumenda nisi ex enim voluptatem rerum nulla quibusdam. Eius libero nam placeat magni illum consectetur provident quam molestias quisquam sed veritatis omnis, asperiores neque non doloremque deserunt? Harum doloribus magnam placeat et eligendi, unde sapiente aperiam sed quidem optio corrupti.";

  return (
    <>
      <section className="text-white py-3 sm:p-3">
        {/* trainer details  */}
        <div className="  px-2 py-3  my-2">
          <h1 className="heading heading1">Trainer Details:</h1>
        </div>
        <div className="box space-y-4 mb-5">
          <div className="flex-col space-y-2 sm:space-y-0 sm:flex sm:flex-row  items-center gap-4">
            <div className="w-40 h-40">
              <img
                src={
                  data?.data?.ctrainer?.sprofilepicUrl === "" ||
                  !data?.data?.ctrainer?.sprofilepicUrl
                    ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                    : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${data?.data?.ctrainer?.sprofilepicUrl}`
                }
                alt="image"
                className="w-[100%] h-[100%] rounded-full image1 object-cover"
              />
            </div>

            <ul className="space-y-1">
              <h1 className="font-extrabold border-b-2 border-yellow-500 text-yellow-500">
                {data?.data?.ctrainer?.sname}
              </h1>
              <li className="flex  items-center gap-2">
                <TiStarFullOutline className="text-xs " /> {data?.data?.ratings}{" "}
                Trainer Ratings
              </li>
              <li className="flex  items-center gap-2">
                <PiStudentFill className="text-xs " />{" "}
                {data?.data?.enrollStudent?.length} Students
              </li>
              <li className="flex  items-center gap-2">
                <BsChatRightQuote className="text-xs " />{" "}
                {data?.data?.ctrainer?.courses?.length} Courses
              </li>
              <li className="flex  items-center gap-2">
                <PiCertificateFill className="text-xs " /> {coursesByTrainer}{" "}
                Review
              </li>
            </ul>
          </div>
        </div>

        {/* review */}
        <div className="">
          <div className="px-2 py-3  my-2">
            <h1 className="heading heading1">Student Review :</h1>
          </div>

          <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3  gap-3">
            <div className="box space-y-4  ">
              <h1 className="" style={{ color: "#CCAA00" }}>
                {" "}
                Featured Review:
              </h1>
              <div className="md:flex items-start md:space-x-4  space-y-4 ">
                <div className=" w-20 h-20 lg:w-18 lg:h-16 rounded-full">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    alt="image"
                    className="w-100 h-100  rounded-full image1 object-cover"
                  />
                </div>

                <div className="">
                  <ul>
                    <li> Elena Thomas</li>
                    <li>⭐⭐⭐⭐</li>
                    <li>
                      lorem ipslfjsa lkjasfh klaskufhes kukkhsui huohef nlkjs
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="box space-y-4  ">
              <h1 className="" style={{ color: "#CCAA00" }}>
                Featured Review:
              </h1>
              <div className="md:flex items-start md:space-x-4  space-y-4 ">
                <div className=" w-20 h-20 lg:w-18 lg:h-16 rounded-full">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    alt="image"
                    className="w-100 h-100  rounded-full image1 object-cover"
                  />
                </div>

                <div className="">
                  <ul>
                    <li> Elena Thomas</li>
                    <li>⭐⭐⭐⭐</li>
                    <li>
                      lorem ipslfjsa lkjasfh klaskufhes kukkhsui huohef nlkjs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="box space-y-4  ">
              <h1 className="" style={{ color: "#CCAA00" }}>
                Featured Review:
              </h1>
              <div className="md:flex items-start md:space-x-4  space-y-4 ">
                <div className=" w-20 h-20 lg:w-18 lg:h-16 rounded-full">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    alt="image"
                    className="w-100 h-100  rounded-full image1 object-cover"
                  />
                </div>

                <div className="">
                  <ul>
                    <li> Elena Thomas</li>
                    <li>⭐⭐⭐⭐</li>
                    <li>
                      lorem ipslfjsa lkjasfh klaskufhes kukkhsui huohef nlkjs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="box space-y-4  ">
              <h1 className="" style={{ color: "#CCAA00" }}>
                {" "}
                Featured Review:
              </h1>
              <div className="md:flex items-start md:space-x-4  space-y-4 ">
                <div className=" w-20 h-20 lg:w-18 lg:h-16 rounded-full">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    alt="image"
                    className="w-100 h-100  rounded-full image1 object-cover"
                  />
                </div>

                <div className="">
                  <ul>
                    <li> Elena Thomas</li>
                    <li>⭐⭐⭐⭐</li>
                    <li>
                      lorem ipslfjsa lkjasfh klaskufhes kukkhsui huohef nlkjs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="box space-y-4  ">
              <h1 className="" style={{ color: "#CCAA00" }}>
                {" "}
                Featured Review:
              </h1>
              <div className="md:flex items-start md:space-x-4  space-y-4 ">
                <div className=" w-20 h-20 lg:w-18 lg:h-16 rounded-full">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    alt="image"
                    className="w-100 h-100  rounded-full image1 object-cover"
                  />
                </div>

                <div className="">
                  <ul>
                    <li> Elena Thomas</li>
                    <li>⭐⭐⭐⭐</li>
                    <li>
                      lorem ipslfjsa lkjasfh klaskufhes kukkhsui huohef nlkjs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default STdetails;
