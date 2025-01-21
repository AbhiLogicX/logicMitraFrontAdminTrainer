import { IoMdList } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { MdError } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import HeaderImg from "../HeaderImg";

const Topbar = ({ setshow, show }) => {
  const Handleclick = () => {
    setshow(!show);
  };

  const [top, settop] = useState();

  const topnav = () => {
    if (window.scrollY > 200) {
      settop(true);
    } else {
      settop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", topnav);
  }, [topnav]);

  const [notifybtn, Shownotifybtn] = useState(false);

  return (
    <>
      <section className="">
        <div
          className={`flex justify-between items-center gap-3 
           px-2 text-white topnavbar
          //  ${top ? `fixed top-0 w-[100%] z-50` : `static`}
      `}
        >
          {/* ///left side */}
          <div className="flex items-center gap-3 py-2">
            <div
              className={`flex items-center justify-between gap-3  transition  ${
                !show ? "w-[100%]" : "w-52"
              }`}
            >
              <div className="w-32">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logicgyan.png`}
                  alt="header log"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>

              <div className="d-lg-block d-none">
                {show ? (
                  <IoMdList
                    className="text-2xl cursor-pointer"
                    onClick={Handleclick}
                  />
                ) : (
                  <IoMdList
                    className="text-2xl cursor-pointer"
                    onClick={Handleclick}
                  />
                )}
              </div>
            </div>

            <div className=" d-lg-block d-none">
              <div className="flex items-center gap-3 border-2 top-search-input rounded-full px-2 py-1">
                <IoSearchSharp />
                <input
                  type="search"
                  placeholder="Search Now"
                  className="  px-2 border-none outline-none text-white bg-none "
                />
              </div>
            </div>
          </div>

          {/* rigth side */}

          <div>
            <ul className="flex items-center gap-3">
              <li className="cursor-pointer">
                <IoNotifications className="text-2xl" />
              </li>
              <li>
                <div className="w-[100%] h-[100%] rounded-full">
                  <img
                    src="https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?t=st=1708936184~exp=1708939784~hmac=1733f677fb3f470b605469627128149a8b0c51bd4c7d3da76e096ef6258ce379&w=1060"
                    alt="image"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
              </li>
              <li className="d-lg-none d-block">
                {show ? (
                  <IoMdList
                    className="text-2xl cursor-pointer"
                    onClick={Handleclick}
                  />
                ) : (
                  <FaTimes
                    className="text-2xl cursor-pointer"
                    onClick={Handleclick}
                  />
                )}
              </li>
              <li className="d-none d-lg-block">
                <FaEllipsisH className="text-2xl" />
              </li>
            </ul>
          </div>
        </div>
        //? this is the notifation bar
      </section>
    </>
  );
};

export default Topbar;
