import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, value, path }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(path);
      }}
      className="col-lg-3 col-md-6 col-sm-6 col-12 cursor-pointer"
    >
      <div className={`card  p-1`}>
        <div className="card-wrap">
          <div className="card-header text-center">
            <p>
              <strong>{title}</strong>
            </p>
          </div>
          <div className="text-5xl font-bold flex justify-center items-center Text">
            <h1> {value} </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
