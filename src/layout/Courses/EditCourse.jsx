import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import { Editor } from "@tinymce/tinymce-react";

import Home from "../../Home";

function EditCourses() {
  const { id } = useParams();

  const [data, error, loading, setReload] = useFetch(
    `/courses/course-detail?courseId=${id}`,
    id
  );
  const [handleUpdate] = useUpdate(`/courses/update-course`);

  const [courseData, setCourseDat] = useState(null);

  useEffect(() => {
    if (!loading) {
      setCourseDat(data?.data);
    }
    // console.log(courseData);
  }, [loading, data?.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append file fields separately if they exist

    // Append other fields, including handling crequirements as array
    Object.keys(courseData).forEach((key) => {
      if (key === "crequirements") {
        courseData.crequirements.forEach((requirement, index) => {
          formData.append(`crequirements[${index}]`, requirement);
        });
      } else {
        formData.append(key, courseData[key]);
      }
    });

    // Submit the form data via handleUpdate
    handleUpdate(`courseId=${id}`, formData, "/courses");
    // axios.put(
    //   `${properties.URLS.BASE_URL_DEV}/api/courses/update-course?courseId=${  }`,
    //   formData
    // );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDat((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log("Chancheck ---->", courseData);
  };

  const handleCheckbox = (e) => {
    const value = e.target.checked;
    setCourseDat((prevData) => ({
      ...prevData,
      ccetification: value ? "true" : "false",
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...courseData.crequirements];
    newRequirements[index] = value;
    setCourseDat((prevData) => ({
      ...prevData,
      crequirements: newRequirements,
    }));
  };

  const addRequirementField = () => {
    setCourseDat((prevData) => ({
      ...prevData,
      crequirements: [...prevData.crequirements, ""],
    }));
  };

  const removeRequirementField = (index) => {
    const newRequirements = courseData.crequirements.filter(
      (_, i) => i !== index
    );
    setCourseDat((prevData) => ({
      ...prevData,
      crequirements: newRequirements,
    }));
  };

  const handleFiles = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    // console.log("Selected file: ", file);

    if (file) {
      setCourseDat((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };

  const handleChangeContent = (content) => {
    setCourseDat((prevData) => ({
      ...prevData,
      ckeywords: content,
    }));
    //
  };

  // const [covImg, setCovImg] = useState(null);
  // const [demoVideo, setDemoViedo] = useState(null);

  // const CourseUrl = "/courses";

  // const courseId = id;

  // //create a state to store all the data that will be sent with request
  // const [formData, setFormData] = useState({
  //   ctitle: "",
  //   cstatus: "",
  //   cduration: "",
  //   cdescription: "",
  //   cthumbnail: "",
  //   // cdemovideo: demoVideo,
  //   // ccoverimage: covImg,
  //   ckeywords: "",
  //   cfees: "",
  //   cofferfees: "",
  // });

  // //when the data is fetched set it to the form data
  // useEffect(() => {
  //   if (data) {
  //     setFormData(data.data);
  //   }
  // }, [data, loading, error]);
  // //create a functon to handle the change of the data
  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   console.log("form changes ----> ", name, type, value);
  //   setFormData((prevParams) => ({
  //     ...prevParams,
  //     [name]: value,
  //   }));
  // };

  // // const handleFileChange = (e) => {
  // //   // const { name, value, type, files } = e.target;
  // //   // console.log(name, files[0]);
  // //   // formData[name] = files[0];
  // //   // console.log("formData ----- > ", formData);
  // // };

  // // Uses a custom hook (useUpdate) for handling the update API call
  // const [handleUpdate] = useUpdate(`/courses/update-course`);

  // // //console.log(formData.ctitle)
  // //create a function to handle submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   for (const key in formData) {
  //     data.append(key, formData[key]);
  //   }
  //   data.append("ccoverimage", covImg);
  //   // formdata.append("thumbanil", formData.cthumbnail);
  //   data.append("cdemovideo", demoVideo);
  //   // console.log("covImg at submit ----> ", covImg);
  //   // console.log("formData at submit ---->  ", data);

  //   // Calls the handleUpdate function from the custom hook
  //   handleUpdate(`courseId=${e.target.id}`, formData, CourseUrl);
  //   // console.log("form submitted", formData);
  // };

  //console.log(formData);
  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {!data.data ? (
          <>loading...</>
        ) : (
          <>
            <div className="w-100 py-3 p-3 mb-16">
              <section className="section py-3">
                <div className="text-xl font-medium text-white  d-flex justify-between items-center">
                  <h1> Edit Course Details</h1>
                </div>
              </section>
              <form
                // Form for Adding Course information
                className="forms-sample   p-4 box"
                onSubmit={handleSubmit}
              >
                {/* Form inputs for course details */}
                <div className="w-100 d-flex gap-3">
                  {/* Form group for coursename*/}
                  <div className="form-group  row">
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Title
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        defaultValue={courseData?.ctitle}
                        name="ctitle"
                        placeholder="Course Title"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Status
                      </label>
                      {/* <input
                        type="number"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        defaultValue={courseData?.cstatus}
                        name="cstatus"
                        placeholder="Course Status"
                        onChange={handleChange}
                      /> */}
                      <select
                        name="cstatus"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        onChange={handleChange}
                        value={courseData?.cstatus}
                      >
                        <option value="">Select status ...</option>
                        <option value={1}>Active</option>
                        <option value={0}>In-Active</option>
                      </select>
                    </div>

                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Duration
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        defaultValue={courseData?.cduration}
                        name="cduration"
                        placeholder="Course Duration"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Fees
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        defaultValue={courseData?.cfees}
                        name="cfees"
                        placeholder="Course Fees"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Offer Fees
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        defaultValue={courseData?.cofferfees}
                        name="cofferfees"
                        placeholder="Course Offer Fees"
                        onChange={handleChange}
                      />
                    </div>

                    {/* <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
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
                    <div className="col-12 col-sm-4 mb-2">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Assignments
                      </label>
                      <input
                        type="number"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cassignments"
                        placeholder="Enter number of assignments"
                        defaultValue={courseData?.cassignments}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 col-sm-4 mb-2">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Real time Projects
                        <small></small>
                      </label>
                      <input
                        type="number"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cprojects"
                        placeholder="Enter number of projects"
                        defaultValue={courseData?.cprojects}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 col-sm-4 mb-2">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Experince in the course
                      </label>
                      <input
                        required
                        type="number"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cexperience"
                        placeholder="Enter years of experince in this course"
                        defaultValue={courseData?.cexperience}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 col-sm-4 mb-2 mt-2">
                      <div>
                        <label
                          className="text-white"
                          htmlFor="exampleInputUsername1"
                        >
                          Certfication is provided
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="ccertification"
                          onChange={handleCheckbox}
                          checked={
                            courseData?.ccetification === "true" ? true : false
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <label className="text-white">Requirements</label>
                      <div>
                        <div>
                          {courseData?.crequirements?.map((ele, index) => (
                            <div className="flex mb-1 ">
                              <input
                                className="form-control input focus-within:bg-none focus:border-none outline-none text-white"
                                type="text"
                                defaultValue={ele}
                                onChange={(e) => {
                                  handleRequirementChange(
                                    index,
                                    e.target.value
                                  );
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
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Cover Image
                      </label>
                      <input
                        type="file"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="ccoverimage"
                        placeholder="Course Cover Image"
                        onChange={handleFiles}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Demo Video
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cdemovideo"
                        placeholder="Course Demo Video"
                        value={courseData?.cdemovideo}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Demo certifiacte
                      </label>
                      <input
                        type="file"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cdemoCertificate"
                        placeholder="Course Demo Video"
                        onChange={handleFiles}
                      />
                    </div>
                    <div className="col-12">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Keywords
                      </label>

                      {/* <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="ckeywords"
                        defaultValue={courseData?.ckeywords}
                        placeholder="Course keywords"
                        onChange={handleChange}
                      /> */}

                      <Editor
                        value={courseData?.ckeywords}
                        apiKey="vbxbmtc52bvwv44by915w7c4usey2snvtwai8a6pkwxtso8i"
                        init={{
                          height: 500,
                          menubar: true,
                          initialValue: courseData?.ckeywords,
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

                    <div className="col-12 w-[100%]">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Discription
                      </label>
                      <textarea
                        name="cdescription"
                        defaultValue={courseData?.cdescription}
                        id=""
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit and cancel buttons */}

                <div className="flex items-center justify-between mt-3">
                  <button
                    type="submit"
                    className="rounded-md py-2 Add-btn px-4"
                  >
                    Update
                  </button>
                  <Link to={"/courses"}>
                    <button
                      type="reset"
                      className="rounded-md py-2 Cancel-btn px-4"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </>
        )}
      </Home>
    </>
  );
}

export default EditCourses;
