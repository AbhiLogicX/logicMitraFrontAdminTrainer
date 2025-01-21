import { FaDownload, FaRegEdit, FaShareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { properties } from "../../config/properties";
import { Link } from "react-router-dom";
import { BsPersonVideo3 } from "react-icons/bs";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { CiDiscount1 } from "react-icons/ci";

const EStudentInfo = ({ student }) => {
  //console.log(student);
  return (
    <>
      <section>
        <div className="flex justify-between items-center border-b-2 p-3 border-yellow-500  text-white">
          <h1 className="heading1">Enrollment Details</h1>

          <ul className="flex items-center gap-3">
            <li className="view-icon p-2 rounded-md">
              <FaRegEdit />
            </li>
            <li className="edit-icon p-2 rounded-md">
              <FaDownload />
            </li>
            <li className="delete-icon p-2 rounded-md">
              <FaShareAlt />
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex sm:flex-row gap-3 text-white p-3">
          <div className="box p-0 relative sm:w-[40%] w-[100%]">
            <img
              src={
                student?.studentid?.sbackgroundUrl === "" ||
                !student?.studentid?.sbackgroundUrl
                  ? "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                  : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${student?.studentid?.sbackgroundUrl}`
              }
              alt="image"
              className="w-[100%] h-44 rounded-md object-cover border-b-2 border-yellow-500 "
            />
            <div className="">
              <div className="w-40 h-40  mx-auto absolute top- left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <img
                  src={
                    student?.studentid?.sprofilepicUrl === "" ||
                    !student?.studentid?.sprofilepicUrl
                      ? "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      : `${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/user/${student?.studentid?.sprofilepicUrl}`
                  }
                  alt="image"
                  className="w-100 h-100  rounded-full image1 object-cover"
                />
              </div>
            </div>
            <div className="btn2 font-extrabold w-[90%] text-black  text-center mx-auto mt-24">
              <p> Student name : {student?.studentid?.sname}</p>
            </div>

            <ul className="px-5 py-2 flex flex-col items-start ">
              <li className="flex items-center gap-2">
                <MdEmail /> Student emial : {student?.studentid?.semail}
              </li>
              <li className="flex items-center gap-2">
                <PiPhone /> Mobile : {student?.studentid?.smobile}
              </li>
            </ul>
          </div>

          <div className="box sm:w-[60%] w-[100%] space-y-2">
            <h1 className="Text font-bold"> Enrolled Course</h1>
            <h1 className="text-xl font-extrabold mb-3">
              {student?.courseid?.ctitle}
            </h1>
            <ul className="">
              <li className="mb-2 flex gap-1 items-center">
                <BsPersonVideo3 />
                Trained By :
                <span className=""> {student?.trainerid?.sname}</span>
                {"  "}
                <Link to={`/trainers/view/${student?.trainerid?._id}`}>
                  <span className="text-yellow-500 underline">
                    get details...
                  </span>
                </Link>
              </li>

              <li className="mb-2 flex gap-1 items-center">
                <FaRegCalendarDays /> Enrolled on :
                {student?.enrolldate.substring(0, 10)}
              </li>
              {/* <li>Enrollment ID : {student?.id}</li> */}
              <li className="mb-2 flex gap-1 items-center">
                <FaRupeeSign />
                At Price : {student?.payamount}
              </li>
              <li className="mb-2 flex gap-1 items-center">
                <MdOutlinePayment />
                Payment Mode : {student?.paymode}{" "}
              </li>
              <li className="mb-2 flex gap-1 items-center">
                {" "}
                <RiCoupon3Fill />
                Coupon Applied : {student?.couponid}{" "}
              </li>
              <li className="mb-2 flex gap-1 items-center">
                <CiDiscount1 />
                At discount : {student?.appdiscount}%
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default EStudentInfo;
