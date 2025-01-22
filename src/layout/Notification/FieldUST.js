import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const FieldUST = ({ open, setOpen, userId, SetParams, paramsData }) => {
  const [auth, setAuth] = useAuth();
  const [StudentList, setStudentList] = useState();
  const [TrainerList, setTrainerList] = useState();
  const [UserList, setuserList] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [loading1, setloading1] = useState(false);
  const [error1, seterror1] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [error2, seterror2] = useState(false);
  // const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading(true);
        const user = await axios.get("/user/all-user");
        setloading(false);
        seterror(false);
        if (user.status === 200) {
          //console.log(user);
          setuserList(user?.data?.data);
        } else {
          //console.log("something is fisyy");
        }
      } catch (error) {
        //console.log(error);
        seterror(error.message);
      }
    };

    fetchdata();
  }, []);

  //console.log(TrainerList);
  //console.log(UserList);

  //console.log(StudentList);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading1(true);
        const trainer = await axios.get("/trainers/list");

        setloading1(false);
        seterror1(false);
        if (trainer.status === 200) {
          //console.log(trainer);
          setTrainerList(trainer.data.data);
        } else {
          //console.log("something is fisyy");
        }
      } catch (error) {
        //console.log(error);
        seterror1(error.message);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading2(true);
        const student = await axios.get(
          `/enroll/enroll-list?trainerid=${
            auth?.userId ? auth?.userId : auth?.user
          }`
        );

        setloading2(false);
        seterror2(false);
        if (student.status === 200) {
          setStudentList(student.data.data);
        } else {
          //console.log("something is fisyy");
        }
      } catch (error) {
        //console.log(error);
        seterror2(error.message);
      }
    };

    fetchdata();
  }, [setStudentList]);

  const [search, setsearch] = useState("");

  // console.log("---->", open);

  const handleAlluerCheckBox = (e) => {
    // console.log(e.target.checked, e.target.name, open);

    if (e.target.checked) {
      // TrainerList
      // StudentList
      // UserList
      if (open === "UserList") {
        const list = UserList.map((ele) => {
          if (ele?.sname) {
            return ele;
          }
        });
        const filterList = list.filter((e) => e);
        SetParams((prev) => ({
          ...prev,
          userId: filterList,
        }));
      }
      if (open === "StudentList") {
        const list = StudentList.map((ele) => {
          if (ele?.sname) {
            return ele;
          }
        });
        const filterList = list.filter((e) => e);
        SetParams((prev) => ({
          ...prev,
          userId: filterList,
        }));
      }
      if (open === "TrainerList") {
        const list = TrainerList.map((ele) => {
          if (ele?.sname) {
            return ele;
          }
        });
        const filterList = list.filter((e) => e);
        SetParams((prev) => ({
          ...prev,
          userId: filterList,
        }));
      }
    } else {
      SetParams((prev) => ({
        ...prev,
        userId: [],
      }));
    }
  };

  const handlechange = (event) => {
    setsearch(event.target.value);
  };

  // useEffect(()=>{
  //  let Studentlistdata=StudentList

  //  if(search){
  //   Studentlistdata= Studentlistdata?.filter(elm=> elm.sname.toLowerCase().includes(search.toLowerCase()))

  //  }else{
  //   setStudentList(Studentlistdata)
  //  }

  //  setStudentList(Studentlistdata)

  // },[search , StudentList , setStudentList  ])

  const AddList = (event) => {
    //console.log(event.target.id);
    if (open === "StudentList") {
      const studentdata = StudentList.find(
        (elm) => elm.studentid._id === event.target.id
      );
      if (userId?.includes(studentdata)) {
        toast.warn("user already selected");
        return;
      }
      SetParams((prevdata) => ({
        ...prevdata,
        userId: [...userId, studentdata],
      }));
    } else if (open === "TrainerList") {
      const studentdata = TrainerList.find((elm) => elm.id === event.target.id);
      if (userId?.includes(studentdata)) {
        toast.warn("user already selected");
        return;
      }
      SetParams((prevdata) => ({
        ...prevdata,
        userId: [...userId, studentdata],
      }));
    } else if (open === "UserList") {
      const studentdata = UserList.find((elm) => elm.id === event.target.id);
      if (userId?.includes(studentdata)) {
        toast.warn("user already selected");
        return;
      }
      SetParams((prevdata) => ({
        ...prevdata,
        userId: [...userId, studentdata],
      }));
    }
  };

  const RemoveList = (e) => {
    //console.log(e.target.id);
    if (open === "StudentList") {
      const studentdata = userId.filter((elm) => elm.id !== e.target.id);

      SetParams((prevdata) => ({
        ...prevdata,
        userId: studentdata,
      }));
    } else if (open === "TrainerList") {
      const studentdata = userId.filter((elm) => elm.id !== e.target.id);

      SetParams((prevdata) => ({
        ...prevdata,
        userId: studentdata,
      }));
    } else if (open === "UserList") {
      const studentdata = userId.filter((elm) => elm.id !== e.target.id);

      SetParams((prevdata) => ({
        ...prevdata,
        userId: studentdata,
      }));
    }
  };

  //console.log(userId);

  return (
    <>
      <section>
        {!userId?.length == 0 && (
          <>
            <div className="flex gap-2 box p-2 overflow-x-scroll mb-5 overflow-y-hidden notification-overflow">
              {userId?.map((elm) => {
                return (
                  <>
                    <div className="flex gap-3 box p-2  rounded-full items-center">
                      <h1>{elm.studentid?.sname}</h1>
                      <button
                        className="cursor-pointer"
                        id={elm.studentid?._id}
                      >
                        <FaTimesCircle
                          id={elm.studentid?._id}
                          onClick={RemoveList}
                        />
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        {open === "StudentList" ? (
          <>
            {loading2 && <h1 className="text-white">Loading...</h1>}
            {error2 && <h1 className="text-white">{error2.message}</h1>}
          </>
        ) : open === "TrainerList" ? (
          <>
            {loading1 && <h1 className="text-white">Loading...</h1>}
            {error1 && <h1 className="text-white">{error1.message}</h1>}
          </>
        ) : open === "UserList" ? (
          <>
            {loading && <h1 className="text-white">Loading...</h1>}
            {error && <h1 className="text-white">{error.message}</h1>}
          </>
        ) : null}

        {open !== "AlluserList" ? (
          <div className="flex items-center mb-2">
            <label for="selectAllUser" className="mr-2 text-white ">
              All users
            </label>
            <input
              type="checkbox"
              name="selectAllUser"
              className="cursor-pointer"
              onChange={handleAlluerCheckBox}
            />
          </div>
        ) : null}

        {open === "StudentList" ? (
          <>
            <div className="space-y-2 box mb-5 overflow-y-scroll h-[300px]">
              <div className="">
                <input
                  type="search"
                  onChange={handlechange}
                  name="search"
                  value={search}
                  placeholder="Search Name"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>

              {StudentList?.map((item) => {
                return (
                  <>
                    {item?.studentid?.sname ? (
                      <div className="flex justify-between box p-2 items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 ">
                            <img
                              src={
                                item.studentid?.sprofilepicUrl === "" ||
                                !item.studentid?.sprofilepicUrl
                                  ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                                  : `https://api.logicmitra.com:8086/uploads/user/${item.sprofilepicUrl}`
                              }
                              alt="image"
                              className="w-100 h-100  rounded-full  border-yellow-700 border-2  object-cover"
                            />
                          </div>
                          <h1>{item.studentid?.sname}</h1>
                        </div>

                        <button
                          className="Add-btn px-4 py-1 rounded-md  "
                          onClick={AddList}
                          id={item.studentid?._id}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </>
        ) : open === "TrainerList" ? (
          <>
            <div className="space-y-2  box mb-5 overflow-y-scroll h-[300px]">
              <div className="">
                <input
                  type="search"
                  onChange={handlechange}
                  name="search"
                  value={search}
                  placeholder="Search Name"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>
              {TrainerList?.map((item) => {
                return (
                  <>
                    {item?.sname ? (
                      <div className="flex justify-between box p-2 items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 ">
                            <img
                              src={
                                item.sprofilepicUrl === "" ||
                                !item.sprofilepicUrl
                                  ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                                  : `https://api.logicmitra.com:8086/uploads/user/${item.sprofilepicUrl}`
                              }
                              alt="image"
                              className="w-100 h-100  rounded-full  border-yellow-700 border-2  object-cover"
                            />
                          </div>
                          <h1>{item.sname}</h1>
                        </div>
                        <button
                          className="Add-btn px-4 py-1 rounded-md  "
                          onClick={AddList}
                          id={item.id}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </>
        ) : open === "UserList" ? (
          <>
            <div className="space-y-2 box mb-5 overflow-y-scroll h-[300px]">
              <div className="">
                <input
                  type="search"
                  onChange={handlechange}
                  name="search"
                  value={search}
                  placeholder="Search Name"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>

              {UserList?.map((item) => {
                return (
                  <>
                    {item?.sname ? (
                      <div className="flex justify-between box p-2 items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 ">
                            <img
                              src={
                                item.sprofilepicUrl === "" ||
                                !item.sprofilepicUrl
                                  ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                                  : `https://api.logicmitra.com:8086/uploads/user/${item.sprofilepicUrl}`
                              }
                              alt="image"
                              className="w-100 h-100  rounded-full  border-yellow-700 border-2  object-cover"
                            />
                          </div>
                          <h1>{item.sname}</h1>
                        </div>
                        <button
                          className="Add-btn px-4 py-1 rounded-md  "
                          onClick={AddList}
                          id={item.id}
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
};

export default FieldUST;
