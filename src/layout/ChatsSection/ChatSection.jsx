import React from "react";
import Home from "../../Home";
import { IoMdSend } from "react-icons/io";

const ChatSection = () => {
  return (
    <Home>
      <div className="text-white grid  w-full px-2 pb-1 ">
        <div className=" col-start-1 col-end-3 px-2 border-r-2 border-amber-500 overflow-y-hidden h-[91vh]">
          <div>
            <h1 className="text-white text-3xl font-medium mb-3">Chats</h1>
            <div className=" top-search-input rounded-md px-2 py-3 flex items-center mb-3">
              <i className="icon-search mx-1"></i>
              <input
                type="search"
                placeholder="Search Students..."
                className="px-2 border-none outline-none w-[100%] "
                style={{ backgroundColor: "#012628" }}
              />
            </div>
          </div>
          <div className="scrollable-content overflow-y-auto h-[87%] pb-3">
            <ui className="">
              <li className="list-none flex p-2 w-full">
                <div className="w-16">
                  <img
                    alt="user-profile-pic"
                    src="https://img.freepik.com/free-photo/young-handsome-guy-wearing-checkered-shirt-looking-standing-emotionless-white-wall_141793-30769.jpg?t=st=1737535499~exp=1737539099~hmac=d4c7742c4155e51e86f1ac3134084692ab484deb1a2e814312de98a5c6fab448&w=1380"
                    style={{
                      aspectRatio: 1 / 1,
                      objectFit: "cover",
                      borderRadius: "40%",
                    }}
                  />
                </div>
                <div
                  style={{ borderBottom: "1px solid" }}
                  className="ml-3 w-full "
                >
                  <h3 className="text-xl font-medium">Lorem Ipsum</h3>
                  <p className="">Last Text</p>
                </div>
              </li>
              <li className="list-none flex p-2 w-full">
                <div className="w-16">
                  <img
                    alt="user-profile-pic"
                    src="https://img.freepik.com/free-photo/young-handsome-guy-wearing-checkered-shirt-looking-standing-emotionless-white-wall_141793-30769.jpg?t=st=1737535499~exp=1737539099~hmac=d4c7742c4155e51e86f1ac3134084692ab484deb1a2e814312de98a5c6fab448&w=1380"
                    style={{
                      aspectRatio: 1 / 1,
                      objectFit: "cover",
                      borderRadius: "40%",
                    }}
                  />
                </div>
                <div
                  style={{ borderBottom: "1px solid" }}
                  className="ml-3 w-full "
                >
                  <h3 className="text-xl font-medium">Lorem Ipsum</h3>
                  <p className="">Last Text</p>
                </div>
              </li>
            </ui>
          </div>
        </div>
        <div className="col-start-3 col-end-12 px-2 h-[91vh]">
          <div
            className="flex p-2 w-full pb-3"
            style={{ borderBottom: "1px solid" }}
          >
            <div className="w-16">
              <img
                alt="user-profile-pic"
                src="https://img.freepik.com/free-photo/young-handsome-guy-wearing-checkered-shirt-looking-standing-emotionless-white-wall_141793-30769.jpg?t=st=1737535499~exp=1737539099~hmac=d4c7742c4155e51e86f1ac3134084692ab484deb1a2e814312de98a5c6fab448&w=1380"
                style={{
                  aspectRatio: 1 / 1,
                  objectFit: "cover",
                  borderRadius: "40%",
                }}
              />
            </div>
            <div className="ml-3 w-full">
              <h1 className="text-white text-3xl font-medium ">Lorem Ipsum</h1>
            </div>
          </div>
          <div
            className="px-3 py-2 scrollable-content overflow-y-auto h-[82%] pb-3"
            style={{ borderBottom: "1px solid" }}
          >
            <ul>
              <li className="list-nonemb-1 flex justify-start">
                <div className="text-left">
                  <div className="chat-left w-fit p-3 flex items-end gap-2">
                    <p className="text-xl">Hey, hi</p>
                    <p className="text-xs text-gray-300">12:30pm</p>
                  </div>
                </div>
              </li>
              <li className="list-none  mb-1 flex justify-end">
                <div className="text-right">
                  <div className="chat-right w-fit p-3 flex items-end gap-2">
                    <p className="text-xl">Hello</p>
                    <p className="text-xs text-gray-300">01:35pm</p>
                  </div>
                </div>
              </li>
              <li className="list-none  mb-1">
                <div className="chat-left w-fit p-3 flex items-end gap-2">
                  <p className="text-xl">Bye</p>{" "}
                  <p className="text-xs text-gray-300">01:45pm</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-3 justify-center flex items-center">
            <div className="border-2 border-emerald-700 rounded-lg py-2 px-2 flex items-center w-[90%] mr-3">
              <input
                type="text"
                placeholder="Message"
                className="px-2 border-none outline-none w-[100%] "
                style={{ backgroundColor: "#012628" }}
              />
            </div>
            <div>
              <button className="bg-emerald-700 p-3 rounded-full">
                <IoMdSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Home>
  );
};

export default ChatSection;
