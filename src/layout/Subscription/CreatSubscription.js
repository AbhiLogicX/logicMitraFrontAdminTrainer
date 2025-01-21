import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Home from "../../Home";

function CreateSubscription() {
  const SubscriptionUrl = "/subscription";
  const [params, setParams] = useState({
    price: 0,
    status: 0,
    description: "",
    duration: 0,
    title: "",
  });
  const nav = useNavigate();

  const handleChangeContent = (content) => {
    setParams((prevFormData) => ({
      ...prevFormData,
      description: content,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`subscription/create`, params)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res?.data?.message || "Data updated Successfully");
          nav(SubscriptionUrl);
        }
      })
      .catch((err) => {
        toast.error("Error occurred plan not updated");
      });
  };

  return (
    <>
      <Home>
        <div className="w-[100%] py-3 p-3 mb-16">
          <section className="section py-3">
            <div className="text-xl font-medium text-white  d-flex justify-between items-center">
              <h1> Create Subscription Plan</h1>
            </div>
          </section>
          <form
            // Form for updating category information
            className="forms-sample w-100 m-2 p-4 box"
            onSubmit={handleSubmit}
            id={params?.id}
          >
            {/* Form inputs for category details */}
            <div className="w-100 ">
              {/* Form group for title */}
              <div className="form-group">
                <div className="flex flex-col-reverse md:flex-row md:flex items-center justify-between ">
                  <div className="grid grid-cols-1  sm:grid-cols-3 gap-5 w-[100%] md:w-[100%]">
                    <div className=" ">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Title of subscription
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={params?.title}
                        name="title"
                        placeholder="Enter the title"
                        onChange={handleChange}
                      />
                    </div>
                    <div className=" ">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Price (in rupees ₹)
                      </label>
                      <input
                        type="number"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={params?.price}
                        name="price"
                        placeholder="Enter the price"
                        onChange={handleChange}
                      />
                    </div>
                    <div className=" ">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Duration (in days)
                      </label>
                      <input
                        type="number"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={params?.duration}
                        name="duration"
                        placeholder="Enter the number days"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Status
                      </label>

                      <div className="text-white d-flex gap-2">
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value={1}
                          checked={params?.status == 1}
                          onChange={handleChange}
                        />
                        Active
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value={0}
                          checked={params?.status == 0}
                          onChange={handleChange}
                        />
                        Inactive
                      </div>
                    </div>
                    <div className="col-span-12 ">
                      <label
                        className="text-white mb-1"
                        htmlFor="exampleInputUsername1"
                      >
                        Description of the subscription
                      </label>
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
                  </div>
                </div>
              </div>
            </div>

            {/* Submit and cancel buttons */}

            <div className=" flex items-center my-4 justify-between">
              <button
                type="submit"
                className="submit Add-btn mr-2  rounded-md sm:px-4 px-5 py-2"
              >
                Add
              </button>
              <Link to={"/subscription"}>
                <button
                  type="reset"
                  className="Cancel-btn  rounded-md sm:px-4 px-5 py-2"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </Home>
    </>
  );
}

export default CreateSubscription;
