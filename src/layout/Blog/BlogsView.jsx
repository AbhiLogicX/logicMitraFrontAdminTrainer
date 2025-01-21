import React from "react";
import { Link } from "react-router-dom";
import Home from "../../Home";
import { useFetch } from "../../hooks/useFetch";
import { useDelete } from "../../hooks/useDelete";
import { properties } from "../../config/properties";

const BlogsView = () => {
  const [data, error, loading, setReload] = useFetch("/blogs/allBlogs/", true);

  const [Delete] = useDelete(`/blogs/delete-blog?id=`);

  const handleDelete = async (e) => {
    Delete(e.target.id, setReload);
  };

  return (
    <Home>
      <div className="px-3 text-white w-[100%]  courses-page mb-16">
        <section className="section mb-4 mt-1">
          <div className="text-xl font-medium mb-3  d-flex justify-between items-center">
            <h1>Blogs</h1>
            <div className="">
              <Link
                to="/blog/add"
                className="Add-btn px-3 py-2 rounded-md  me-2"
              >
                Add Blogs
              </Link>
            </div>
          </div>
        </section>
        <div className="box grid grid-cols-4 gap-3">
          {data?.data?.map((ele) => (
            <div
              className="border-1 border-amber-400 rounded p-3 flex justify-center items-center flex-col"
              style={{ height: "500px" }}
            >
              <div className="mb-3 border-3" style={{ width: "98%" }}>
                <img
                  src={`${properties.URLS.BASE_URL_IMG_ONRENDER}/uploads/blogs/${ele.bimage}`}
                  alt="blgImg"
                  style={{ objectFit: "cover", aspectRatio: "4/3" }}
                />
              </div>
              <div className="mb-4" style={{ width: "97%" }}>
                <p
                  style={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                  className="text-2xl text-left mb-3"
                >
                  {ele.bheading}
                </p>
                <p
                  style={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 6,
                  }}
                >
                  {ele.bdescription}
                </p>
              </div>
              <div style={{ width: "97%" }} className="text-right">
                <Link
                  className=" py-2 px-3 mr-2 rounded-md edit-icon"
                  to={`/blog/edit/${ele.id}`}
                >
                  <i className="bi bi-pencil-square"></i>
                </Link>

                <Link
                  className="  py-2 px-3 rounded-md delete-icon "
                  onClick={handleDelete}
                  id={ele.id}
                >
                  <i className="bi bi-trash3"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[100%]"></div>
      </div>
    </Home>
  );
};

export default BlogsView;
