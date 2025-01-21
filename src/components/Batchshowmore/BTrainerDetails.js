import { useState } from "react";
import { BiChevronUp } from "react-icons/bi";

import { BiChevronDown } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { PiStudentFill } from "react-icons/pi";
import { BsChatRightQuote } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
const BTrainerDetails = ({BtrainerData}) => {
  
  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  const content1 = " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis sequi deleniti fugiat sed ipsam commodi exercitationem amet maiores, esse provident cumque! Incidunt eos quibusdam illo suscipit nulla, aspernatur debitis maiores veritatis deleniti placeat laboriosam asperiores labore maxime veniam amet sequi, voluptatibus cumque eius dicta harum officiis iure eligendi dolorum rem. Dolore, alias! Porro temporibus quaerat reiciendis, praesentium consequatur ea voluptas magni saepe repudiandae ipsa illo debitis voluptatem vero velit culpa, deleniti distinctio alias! Praesentium, error aliquid cum perspiciatis officia molestias tempore. Nulla laborum rerum id repellat aut architecto vero voluptates voluptatum obcaecati beatae ut aliquam maiores, corporis, placeat amet numquam totam dolore. Quam molestias corporis architecto eligendi cupiditate eaque, earum repellendus quaerat commodi numquam nulla soluta voluptatibus aperiam, quos id facilis vitae et voluptatum officiis incidunt. Ipsum, autem corporis officiis atque non reprehenderit quis nemo, impedit harum aspernatur consequuntur et dolorem! Culpa, nihil. Dolorum, aliquam. Numquam rem nihil recusandae molestias fuga quisquam cum culpa eum quia pariatur, consectetur animi magnam assumenda nisi ex enim voluptatem rerum nulla quibusdam. Eius libero nam placeat magni illum consectetur provident quam molestias quisquam sed veritatis omnis, asperiores neque non doloremque deserunt? Harum doloribus magnam placeat et eligendi, unde sapiente aperiam sed quidem optio corrupti.";
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center  py-2">
          <h1 className=" heading ">Trainer Details</h1>
        </div>
        <div className="box space-y-4">
          <div className="space-y-4 sm:space-y-0 sm:flex  items-center gap-4">
            <div className="w-40 h-40 ">
              <img
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="image"
                className="w-[100%] h-[100%] rounded-full image1 object-cover "
              />
            </div>

            <ul className="space-y-1">
              <h1 className="font-extrabold border-b-2 border-yellow-500 text-yellow-500">
               {BtrainerData?.sname}
              </h1>
              <li className="flex  items-center gap-2">
                <TiStarFullOutline className="text-xs " /> 4.5 Trainer Ratings{" "}
              </li>
              <li className="flex  items-center gap-2">
                {" "}
                <PiStudentFill className="text-xs " /> 1750 Students
              </li>
              <li className="flex  items-center gap-2">
                <BsChatRightQuote className="text-xs " /> 38 Courses{" "}
              </li>
              <li className="flex  items-center gap-2">
                <PiCertificateFill className="text-xs " /> 1750 Review
              </li>
            </ul>
          </div>

          <div className="   space-y-2 ">
            <h1 className="heading1"> Description:</h1>

            <div className="flex flex-col items-start justify-between space-y-8">
              <p>{show ? content1 : `${content1.slice(0, 300)}...`}</p>

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
    </>
  );
};

export default BTrainerDetails;
