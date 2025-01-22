import React, { useState } from "react";
import FieldUST from "./FieldUST";
import { toast } from "react-toastify";
import axios from "axios";
import Home from "../../Home";
import { useNavigate } from "react-router-dom";
import { properties } from "../../config/properties";
import { Editor } from "@tinymce/tinymce-react";
import { convertHtmlToText } from "../../util/htmltoText";

const Notification = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState("AlluserList");

  //console.log(open);
  const handleClickOpen = (elm) => {
    setOpen(elm);
  };

  const [params, SetParams] = useState({
    title: "",
    message: "",
    banner: "",
    userId: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    SetParams((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (params.userId.length == 0 || !params.title || !params.message) {
      toast.warn("Fill all fields");
      return;
    }

    try {
      const allUserIds = params.userId.map((ele) => ele.studentid?._id);
      const formData = new FormData();
      formData.append("title", params.title);
      formData.append("message", params.message);
      formData.append("banner", params.banner); // Assuming `banner` is the file
      formData.append("userId[]", [...allUserIds]);
      const { data } = await axios.post(
        `${properties.URLS.BASE_URL_DEV}/api/notification/selected-user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.response == "success") {
        toast.success("Notification Sent");
        //console.log(data);
        navigate("/notification/edit");
      } else {
        toast.warn("Try Again!!");
        //console.log(data);
      }
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };
  //console.log(params);
  const handleChangeContent = (content) => {
    const normalText = convertHtmlToText(content);
    SetParams((prevFormData) => ({
      ...prevFormData,
      message: normalText,
    }));
  };

  return (
    <>
      <Home>
        <section className="w-[100%] py-3 p-3 mb-16">
          <section className="section py-3">
            <div className="text-xl font-medium text-white  d-flex justify-between items-center">
              <h1 className="heading1">Notification</h1>
            </div>
          </section>
          <div className="box text-white p-3">
            <div className="flex items-center gap-3">
              {/* <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="inputelement"
                  className=""
                  name="Notificationuser"
                  onClick={() => handleClickOpen("UserList")}
                />
                <label className="text-white" htmlFor="inputelement">
                  {" "}
                  All Users
                </label>
              </div> */}

              {/* <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="inputelement"
                  className=""
                  name="Notificationuser"
                  onClick={() => handleClickOpen("TrainerList")}
                />
                <label className="text-white" htmlFor="inputelement">
                  Trainers
                </label>
              </div> */}

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="inputelement"
                  className=""
                  name="Notificationuser"
                  onClick={() => handleClickOpen("StudentList")}
                />
                <label className="text-white" htmlFor="inputelement">
                  Your Students
                </label>
              </div>
            </div>

            <div className="">
              {
                <FieldUST
                  open={open}
                  setOpen={setOpen}
                  userId={params.userId}
                  SetParams={SetParams}
                  paramsData={params}
                />
              }
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <p> Title</p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Title"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>

              <div className="space-y-2">
                <p> Image</p>
                <input
                  type="file"
                  name="banner"
                  onChange={handleChange}
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>
              {/* <div className="space-y-2">
                <p> Messages</p>
                <textarea
                  type="text"
                  name="message"
                  onChange={handleChange}
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  placeholder="Type here..."
                ></textarea>
              </div> */}
              <div className="space-y-2">
                <Editor
                  apiKey="vbxbmtc52bvwv44by915w7c4usey2snvtwai8a6pkwxtso8i"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "image",
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                      "anchor",
                    ],
                    toolbar:
                      "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={handleChangeContent}
                />
              </div>
              <button
                className="Add-btn px-3 py-2 rounded-md mt-3 "
                onClick={handleSendNotification}
              >
                {" "}
                Send Notification
              </button>
            </div>
          </div>
        </section>
      </Home>
    </>
  );
};

export default Notification;
