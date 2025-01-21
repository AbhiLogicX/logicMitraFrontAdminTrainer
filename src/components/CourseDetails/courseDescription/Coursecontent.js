import * as React from "react";
import Accordion from "@mui/material/Accordion";

import { FaClock } from "react-icons/fa";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const CourseContent = ({ CourseData }) => {
  const [data1, setdata] = useState();
  React.useEffect(() => {
    setdata(CourseData);
  }, [CourseData]);

  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  const content1 =
    " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis sequi deleniti fugiat sed ipsam commodi exercitationem amet maiores, esse provident cumque! Incidunt eos quibusdam illo suscipit nulla, aspernatur debitis maiores veritatis deleniti placeat laboriosam asperiores labore maxime veniam amet sequi, voluptatibus cumque eius dicta harum officiis iure eligendi dolorum rem. Dolore, alias! Porro temporibus quaerat reiciendis, praesentium consequatur ea voluptas magni saepe repudiandae ipsa illo debitis voluptatem vero velit culpa, deleniti distinctio alias! Praesentium, error aliquid cum perspiciatis officia molestias tempore. Nulla laborum rerum id repellat aut architecto vero voluptates voluptatum obcaecati beatae ut aliquam maiores, corporis, placeat amet numquam totam dolore. Quam molestias corporis architecto eligendi cupiditate eaque, earum repellendus quaerat commodi numquam nulla soluta voluptatibus aperiam, quos id facilis vitae et voluptatum officiis incidunt. Ipsum, autem corporis officiis atque non reprehenderit quis nemo, impedit harum aspernatur consequuntur et dolorem! Culpa, nihil. Dolorum, aliquam. Numquam rem nihil recusandae molestias fuga quisquam cum culpa eum quia pariatur, consectetur animi magnam assumenda nisi ex enim voluptatem rerum nulla quibusdam. Eius libero nam placeat magni illum consectetur provident quam molestias quisquam sed veritatis omnis, asperiores neque non doloremque deserunt? Harum doloribus magnam placeat et eligendi, unde sapiente aperiam sed quidem optio corrupti.";

  //console.log(data1?.data);
  return (
    <>
      <section className="py-3 sm:p-3 text-white ">
        {/* accordian course content */}
        <div className="space-y-4 lg:mt-32">
          <h1 className="heading heading1 text-white">Couse Module Details</h1>
          {!data1?.data?.cmodules == [] ? (
            <>
              <div
                className="box border-2 p-0 "
                style={{ backgroundColor: "" }}
              >
                {data1?.data?.cmodules.map((elm) => {
                  return (
                    <>
                      <Accordion defaultExpanded>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon className="text-white" />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          sx={{
                            backgroundColor: "#013437",
                            color: "white",
                            borderBottom: "0.5px solid #CCAA00",
                          }}
                        >
                          <div className=" flex justify-between gap-4 w-[100%]">
                            <h1>{elm.title}</h1>
                            <div className="flex ">
                              <h1>{elm.subModule.length} Topics</h1>
                              <h1>{elm.duration}</h1>
                            </div>
                          </div>
                        </AccordionSummary>

                        {!elm.subModule == [] ? (
                          elm.subModule.map((elm) => {
                            return (
                              <>
                                <AccordionDetails
                                  sx={{
                                    backgroundColor: "#04775A",
                                    color: "white",
                                    borderBottom: "1px solid #CCAA00",
                                  }}
                                >
                                  <div className="">
                                    <ul className="flex justify-between">
                                      <li>{elm?.title}</li>
                                      <li>{elm?.duration}</li>
                                    </ul>
                                  </div>
                                </AccordionDetails>
                              </>
                            );
                          })
                        ) : (
                          <>
                            <div className="text-white"> there is no data</div>
                          </>
                        )}
                      </Accordion>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="text-white"> there is no data</div>
            </>
          )}

          {/* Requirements */}

          <div className="box">
            <h1 className="font-medium heading"> Requirements : </h1>
            {CourseData?.data?.crequirements?.length !== 0 ? (
              <ul className="list-disc p-3">
                {CourseData?.data?.crequirements?.map((ele, index) => (
                  <li key={index}>{ele}</li>
                ))}
              </ul>
            ) : (
              <p> No Requirements required</p>
            )}
          </div>

          {/* description */}

          {/* <div className="">
            <h1 className="font-medium"> Description :</h1>

            <div className="flex flex-col items-start justify-between space-y-8 p-1">
              <p>
                {show
                  ? `${data1?.data?.cdescription}`
                  : `${data1?.data?.cdescription.slice(0, 300)}...`}
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
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CourseContent;
