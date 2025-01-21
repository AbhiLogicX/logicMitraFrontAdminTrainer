import { useState, useEffect } from "react";
import { BiChevronUp } from "react-icons/bi";

import { BiChevronDown } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { BsChatRightQuote } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { properties } from "../../../config/properties";
const AboutTrainer = ({ TrainerData, ...details }) => {
  //console.log(TrainerData);
  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  const [data, setdata] = useState();

  useEffect(() => {
    setdata(TrainerData);
  }, [TrainerData]);

  console.log("Trainer Data --->", data);

  const content1 =
    " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis sequi deleniti fugiat sed ipsam commodi exercitationem amet maiores, esse provident cumque! Incidunt eos quibusdam illo suscipit nulla, aspernatur debitis maiores veritatis deleniti placeat laboriosam asperiores labore maxime veniam amet sequi, voluptatibus cumque eius dicta harum officiis iure eligendi dolorum rem. Dolore, alias! Porro temporibus quaerat reiciendis, praesentium consequatur ea voluptas magni saepe repudiandae ipsa illo debitis voluptatem vero velit culpa, deleniti distinctio alias! Praesentium, error aliquid cum perspiciatis officia molestias tempore. Nulla laborum rerum id repellat aut architecto vero voluptates voluptatum obcaecati beatae ut aliquam maiores, corporis, placeat amet numquam totam dolore. Quam molestias corporis architecto eligendi cupiditate eaque, earum repellendus quaerat commodi numquam nulla soluta voluptatibus aperiam, quos id facilis vitae et voluptatum officiis incidunt. Ipsum, autem corporis officiis atque non reprehenderit quis nemo, impedit harum aspernatur consequuntur et dolorem! Culpa, nihil. Dolorum, aliquam. Numquam rem nihil recusandae molestias fuga quisquam cum culpa eum quia pariatur, consectetur animi magnam assumenda nisi ex enim voluptatem rerum nulla quibusdam. Eius libero nam placeat magni illum consectetur provident quam molestias quisquam sed veritatis omnis, asperiores neque non doloremque deserunt? Harum doloribus magnam placeat et eligendi, unde sapiente aperiam sed quidem optio corrupti.";
  return (
    <>
      <div className="my-3">
        {/* <div className="flex justify-between items-center px-2 py-3  my-2">
          <h1 className=" heading ">About</h1>
        </div> */}
        <div className="box space-y-4">
          <div className="flex-col  space-y-2 sm:space-y-0 sm:flex sm:flex-row  items-center gap-4">
            <div className="w-40 h-40 ">
              <img
                src={
                  data?.data?.sprofilepicUrl === "" ||
                  !data?.data?.sprofilepicUrl
                    ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                    : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${data?.data?.sprofilepicUrl}`
                }
                alt="image"
                className="w-[100%] h-[100%] rounded-full image1 object-cover "
              />
            </div>

            <ul className="space-y-1">
              <h1 className="font-extrabold border-b-2 border-yellow-500 text-yellow-500">
                {data?.data?.sname}
              </h1>
              <li className="flex  items-center gap-2">
                <TiStarFullOutline className="text-xs " />{" "}
                {`${data?.data?.srating} - Ratings`}
              </li>
              <li className="flex  items-center gap-2">
                <PiStudentFill className="text-xs " />
                {details?.studentsEnrolled} Students
              </li>
              <li className="flex  items-center gap-2">
                <BsChatRightQuote className="text-xs " />
                {data?.data?.courses?.length} Courses
              </li>

              <li className="flex  items-center gap-2">
                <MdOutlineHistoryEdu className="text-xs " />
                {data?.data?.levelOfeducation} - {data?.data?.passOutYear}
              </li>
              <li className="flex  items-center gap-2">
                <PiCertificateFill className="text-xs " />
                {data?.data?.srating} Review
              </li>

              <li className="flex  items-center gap-2">
                <MdDateRange className="text-xs " />
                Joined On:{" "}
                {new Date(data?.data?.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </li>
            </ul>
          </div>

          <div className="   space-y-2 ">
            <h1 className="heading1"> Description:</h1>

            <div className="flex flex-col items-start justify-between space-y-8">
              <p>
                {show
                  ? `${data?.data?.sabout}`
                  : `${data?.data?.sabout?.slice(0, 300)}...`}
              </p>

              <button className="" onClick={() => showmoreclick()}>
                {show ? (
                  <div className="flex items-center  text-sm gap-1 w-[100%]">
                    <BiChevronUp className="text-yellow-600 text-2xl font-extrabold" />
                    Show less
                  </div>
                ) : (
                  <div className="flex items-center  text-sm gap-1  w-[100%]">
                    <BiChevronDown className="text-yellow-600 text-2xl font-extrabold" />
                    Show more
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTrainer;
