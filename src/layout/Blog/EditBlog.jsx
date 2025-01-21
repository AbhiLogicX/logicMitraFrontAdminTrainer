import React, { useEffect, useState } from "react";
import Home from "../../Home";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Editor } from "@tinymce/tinymce-react";

const EditBlog = () => {
  const [formData, setFormData] = useState({
    bheading: "",
    bimage: "",
    bdescription: "",
    bcontent: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const [data, error, loading, setReload] = useFetch(
    `/blogs/blogById?id=${params.id}`,
    true
  );

  useEffect(() => {
    if (data?.data) {
      setFormData({
        bheading: data.data.bheading || "",
        bimage: data.data.bimage || "",
        bdescription: data.data.bdescription || "",
        bcontent: data.data.bcontent || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeContent = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      bcontent: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/blogs/edit-blog?id=${params.id}`,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/blogs ");
      }
    } catch (error) {
      toast.error("Something went wrong, blog not updated");
    }
  };

  return (
    <Home>
      <div className="w-[100%] py-3 sm:p-3 mb-16">
        <section className="section">
          <div className="text-xl font-medium text-white d-flex justify-between items-center mb-3">
            <h1>Edit Blog</h1>
          </div>

          <form className="forms-sample m-2 p-4 box" onSubmit={handleSubmit}>
            <div className="w-100 gap-3 mb-3">
              <div className="form-group row">
                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="name">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    name="bheading"
                    placeholder="Enter Blog Title"
                    value={formData.bheading}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="name">
                    Blog Display Image *
                  </label>
                  <input
                    type="file"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    name="bimage"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bimage: e.target.files[0],
                      }))
                    }
                  />
                </div>

                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="name">
                    Blog Description *
                  </label>
                  <textarea
                    rows="3"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    name="bdescription"
                    placeholder="Enter short blog description"
                    value={formData.bdescription}
                    onChange={handleChange}
                    style={{
                      overflow: "hidden", // Hide scrollbar
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="">
              <Editor
                value={formData.bcontent}
                apiKey="vbxbmtc52bvwv44by915w7c4usey2snvtwai8a6pkwxtso8i"
                init={{
                  initialValue: formData.bcontent,
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
            <button type="submit" className="btn btn-primary mt-4">
              Update Blog
            </button>
          </form>
        </section>
      </div>
    </Home>
  );
};

export default EditBlog;
