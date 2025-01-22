import { NavLink, useNavigate } from "react-router-dom";

// import { CiGrid41 } from "react-icons/ci";
// import { Tooltip } from "@mui/material";
// import Dropdown from "react-bootstrap/Dropdown";
import { PiStudentBold } from "react-icons/pi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";

import { MdPersonOutline } from "react-icons/md";

import { MdOutlineAssignment } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineEditLocation } from "react-icons/md";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { SiBackstage } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import { FaRightFromBracket } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaUserTag } from "react-icons/fa6";
import { MdNotificationAdd } from "react-icons/md";
import { MdEditNotifications } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { PiChatsBold } from "react-icons/pi";
// import { useAuth } from "../../../context/auth";

const Sidebar = ({ setshow, show }) => {
  const [showdrop, setshowdrop] = useState(false);
  const Dropclick = () => {
    setshowdrop(!showdrop);
  };

  const navigate = useNavigate();

  const handleLogut = () => {
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <section
        className={`d-none d-lg-block text-white  sidebar px-1 py-3 -mt-5  lg:static fixed  top-16     ${
          show ? "   right-0 " : "lg:w-14 -right-72"
        }`}
      >
        <ul className=" space-y-3 overflow-y-scroll sidebar-overflow h-[80%] lg:h-[100%]">
          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/"
            >
              {show ? (
                <MdDashboard className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Dashboard"
                >
                  <MdDashboard className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Dashboard
              </span>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/enrollment"
            >
              {show ? (
                <FiUserPlus
                  className="text-xl
               "
                />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Enrollment"
                >
                  <FiUserPlus className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Enrollment
              </span>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/students"
            >
              {show ? (
                <PiStudentBold className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Students"
                >
                  <PiStudentBold className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Students
              </span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/courses"
            >
              {show ? (
                <MdOutlineAssignment className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Courses"
                >
                  <MdOutlineAssignment className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Courses
              </span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/batches"
            >
              {show ? (
                <SiBackstage className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Batch"
                >
                  <SiBackstage className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Batches
              </span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/enquiries"
            >
              {show ? (
                <LuFileSpreadsheet className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Batch"
                >
                  <LuFileSpreadsheet className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Enquiries
              </span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/chats"
            >
              {show ? (
                <PiChatsBold className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Batch"
                >
                  <PiChatsBold className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Chats
              </span>
            </NavLink>
          </li>

          <li>
            <div className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md cursor-pointer w-[100%]">
              {show ? (
                <IoNotifications className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Location"
                >
                  <IoNotifications className="text-xl" />
                </button>
              )}

              <div className={` ${!show ? "d-lg-none" : "d-block"}`}>
                <div
                  className="flex justify-between items-center w-[100%] "
                  onClick={Dropclick}
                >
                  Notification Section
                  {showdrop ? (
                    <BiChevronUp className="text-xl" />
                  ) : (
                    <BiChevronDown className="text-xl" />
                  )}
                </div>
              </div>
            </div>

            {showdrop ? (
              <>
                <ul className=" border-none outline-none gap-2 side-menu p-2 rounded-md mt-2 space-y-1">
                  <li>
                    <NavLink
                      className="locationdropdown p-1 cursor-pointer flex gap-2 items-center rounded-md"
                      to="/notification"
                      style={{ color: "white" }}
                    >
                      <MdNotificationAdd className="text-xl" />
                      Send Notification
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="locationdropdown p-1 cursor-pointer flex gap-2 items-center rounded-md"
                      to="/notification/edit"
                      style={{ color: "white" }}
                    >
                      <MdEditNotifications className="text-xl" />
                      Notification List
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : null}
          </li>
          <li className="">
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/withdraws"
            >
              {show ? (
                <PiHandWithdraw className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Trainers"
                >
                  <PiHandWithdraw className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Withdraw Requests
              </span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              to="/notification"
            >
              {show ? (
                <IoNotifications className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Notification"
                >
                  <IoNotifications className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Notification
              </span>
            </NavLink>
          </li> */}
          <li>
            <NavLink
              className="border-none outline-none flex items-center gap-2 side-menu p-2 rounded-md "
              style={{ color: "white" }}
              onClick={handleLogut}
            >
              {show ? (
                <FaRightFromBracket className="text-xl" />
              ) : (
                <button
                  className=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Logout"
                >
                  <FaRightFromBracket className="text-xl" />
                </button>
              )}
              <span className={` ${!show ? "d-lg-none" : "d-block"}`}>
                Logout
              </span>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
