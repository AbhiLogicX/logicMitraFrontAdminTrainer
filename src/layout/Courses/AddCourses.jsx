import React, { useEffect, useState } from "react";
// import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
// import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "../../context/auth";

function AddCourses() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Fetching the category data for specific id and title
  const [data, error, loading] = useFetch("/categories/list", true);

  // Initial form data
  const initialFormData = {
    cslug: "",
    ctitle: "",
    cintro: "",
    AccessPeriodDays: "",
    caddon: "",
    cstatus: "",
    ccategory: "",
    csubcategory: "",
    ctype: "",
    cduration: "",
    cfees: "",
    cofferfees: "",
    ctrainer: auth?.userId ? auth?.userId : auth?.user,
    cthumbnail: null,
    ccoverimage: null,
    cdemovideo: "",
    ckeywords: "",
    cmodules: "",
    cdescription: "",
    crequirements: [""],
    cassignments: null,
    ccetification: "",
    cprojects: null,
    cexperience: "",
    cdemoCertificate: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [subCat, setsubCat] = useState();

  // Fetch subcategories based on selected category
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `/categories/sub-cat?catg=${formData?.ccategory}`
        );
        if (res.status === 200) {
          setsubCat(res.data?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (formData?.ccategory) {
      fetchdata();
    }
  }, [formData?.ccategory]);

  const [data2, error2, loading2] = useFetch(`/trainers/list`);

  // Handle change in requirements fields
  const handleRequirementChange = (index, value) => {
    // console.log(index, value);
    const newRequirements = [...formData.crequirements];
    newRequirements[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      crequirements: newRequirements,
    }));
    // console.log("-->", formData.crequirements);
  };

  const handleCheckbox = (e) => {
    const value = e.target.checked;
    if (value) {
      formData.ccetification = "true";
    } else {
      formData.ccetification = "false";
    }
  };

  // Add a new requirement field
  const addRequirementField = () => {
    // console.log("->", formData.crequirements);
    setFormData((prevData) => ({
      ...prevData,
      crequirements: [...prevData.crequirements, ""],
    }));
  };

  // Remove a requirement field
  const removeRequirementField = (index) => {
    const newRequirements = formData.crequirements.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      crequirements: newRequirements,
    }));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("---->", formData);

    try {
      const formDataToSend = new FormData();

      // Append file fields if they exist

      // Append other form fields
      Object.keys(formData).forEach((key) => {
        // Check if the key is `crequirements` to handle it differently
        if (key === "crequirements") {
          formData[key].forEach((requirement, index) => {
            formDataToSend.append(`crequirements[${index}]`, requirement);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      formDataToSend.append("cslug", formData["ctitle"]);

      const response = await axios.post(
        `/courses/create-course`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.response === "success") {
        toast.success("Course Created Successfully");
        setTimeout(() => {
          navigate("/courses");
        }, 1000);
      } else {
        toast.warn("Course is not created");
      }
    } catch (error) {
      toast.error(
        error?.AxiosError?.name?.response?.data?.message
          ? error?.AxiosError?.name?.response?.data?.message
          : "Something Went wrong!!"
      );
    }
  };

  const handleChangeContent = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      ckeywords: content,
    }));
  };

  //console.log(formData);
  return (
    <Home>
      <div className="w-[100%] py-3 sm:p-3 mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium text-white  d-flex justify-between items-center">
            <h1> Add Course Details</h1>
          </div>
        </section>
        <form
          // Form for Adding Course information
          className="forms-sample  m-2 p-4 box "
          onSubmit={handleSubmit}
        >
          {/* Form inputs for course details */}
          <div className="w-100  gap-3">
            {/* Form group for coursename*/}
            <div className="form-group  row">
              {/* <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Slug *
                </label>
                <input
                  type="text"
                  required
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={formData?.cslug}
                  name="cslug"
                  placeholder="Course Slug"
                  onChange={handleChange}
                />
              </div> */}
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  {" "}
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={formData?.ctitle}
                  name="ctitle"
                  placeholder="Course Title"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="category">
                  {" "}
                  Category *
                </label>

                <div>
                  <select
                    name="ccategory"
                    value={formData.ccategory}
                    onChange={handleChange}
                    id="category"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                  >
                    <option selected>Open this select menu</option>
                    {data?.data &&
                      data?.data.map((elm) => {
                        // const { _id, title } = elm.ccategory;
                        // //console.log(_id, title);
                        return (
                          <>
                            <option value={elm.id}>{elm.title}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="subcategory">
                  {" "}
                  Subcategory *
                </label>

                <div>
                  <select
                    name="csubcategory"
                    value={formData.csubcategory}
                    onChange={handleChange}
                    id="subcategory"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                  >
                    <option selected>Open this select menu</option>
                    {subCat?.map((elm) => {
                      return (
                        <>
                          <option value={elm.id}>{elm.title}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Duration <small>(in months)</small>
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={formData?.cduration}
                  name="cduration"
                  placeholder="Course Duration"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Fees
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={formData?.cfees}
                  name="cfees"
                  placeholder="Course Fees"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Offer Fees
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  value={formData?.cofferfees}
                  name="cofferfees"
                  placeholder="Course Offer Fees"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="col-12 col-sm-4  flex flex-col">
                <label className="text-white" htmlFor="ctrainer">
                  * Course Trainer
                </label>

                <div>
                  <select
                    name="ctrainer"
                    value={formData.ctrainer}
                    onChange={handleChange}
                    id="ctrainer"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                  >
                    <option selected>Open this select menu</option>
                    {data2?.data &&
                      data2?.data.map((elm) => {
                        // const { _id, sname } = elm.ctrainer;
                        // //console.log(_id, sname);
                        return (
                          <>
                            <option value={elm.id}>{elm.sname}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div> */}

              {/* <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Thumbnail
                </label>
                <input
                  type="file"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="cthumbnail"
                  placeholder="Course Duration"
                  onChange={handleChange}
                />
              </div> */}
              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Cover Image
                </label>
                <input
                  type="file"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="ccoverimage"
                  placeholder="Course Cover Image"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Assignments
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="cassignments"
                  placeholder="Enter number of assignments"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Real time Projects
                  <small></small>
                </label>
                <input
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="cprojects"
                  placeholder="Enter number of projects"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4 mb-2 mt-2">
                <div>
                  <label className="text-white" htmlFor="exampleInputUsername1">
                    Certfication is provided
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="ccertification"
                    onChange={handleCheckbox}
                  />
                </div>
              </div>
              {/* <div className="col-12">
                <label className="text-white">Requirements</label>
                <div>
                  <div>
                    {formData.crequirements.map((ele, index) => (
                      <div className="flex mb-1 ">
                        <input
                          className="form-control input focus-within:bg-none focus:border-none outline-none text-white"
                          type="text"
                          defaultValue={ele}
                          onChange={(e) => {
                            handleRequirementChange(index, e.target.value);
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            removeRequirementField(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary my-2"
                      onClick={addRequirementField}
                    >
                      Add Requirement
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="col-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Demo Video Url
                </label>
                <input
                  type="link"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="cdemovideo"
                  value={formData?.cdemovideo}
                  placeholder="Course Demo Video URL"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Experince in the course
                </label>
                <input
                  required
                  type="number"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="cexperience"
                  placeholder="Enter years of experince in this course"
                  defaultValue={formData?.cexperience}
                  onChange={handleChange}
                />
              </div>
              <div className="coll-12 col-sm-4">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Demo certifiacte
                </label>
                <input
                  type="file"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  name="cdemoCertificate"
                  placeholder="Course Demo Video"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Keywords
                </label>

                <Editor
                  value={formData?.ckeywords}
                  apiKey="vbxbmtc52bvwv44by915w7c4usey2snvtwai8a6pkwxtso8i"
                  init={{
                    height: 500,
                    menubar: true,
                    initialValue: formData?.ckeywords,
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
              <div className="col-12">
                <label className="text-white" htmlFor="exampleInputUsername1">
                  Course Discription
                </label>
                <textarea
                  name="cdescription"
                  id=""
                  placeholder="Description"
                  handleChange={formData?.cdescription}
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Submit and cancel buttons */}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="Add-btn rounded-sm py-2 my-2 px-5 sm:px-4"
              >
                Submit
              </button>

              <button
                type="reset"
                className="Cancel-btn  py-2  rounded-sm my-2 px-5 sm:px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Home>
  );
}

export default AddCourses;
