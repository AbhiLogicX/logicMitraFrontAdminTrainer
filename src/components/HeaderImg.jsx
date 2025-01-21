import React from "react";

const HeaderImg = () => {
  return (
    <div className="w-32 ">
      <img
        src={`${process.env.PUBLIC_URL}/logicgyan.png`}
        alt="header log"
        className="w-[100%] h-[100%] object-cover"
      />
    </div>
  );
};

export default HeaderImg;
