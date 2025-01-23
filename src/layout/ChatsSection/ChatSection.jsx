import React, { useEffect, useState } from "react";
import Home from "../../Home";
import { IoMdSend } from "react-icons/io";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/auth";
import { properties } from "../../config/properties";
import ChatConversation from "./ChatConversation";
import axios from "axios";
import { toast } from "react-toastify";

const ChatSection = () => {
  const [auth, setAuth] = useAuth();
  const [conversation, setConversationId] = useState("");
  const [conversationPersonImg, setConversationPersonImg] = useState(null);
  const [tid, setTid] = useState(auth?.userId ? auth?.userId : auth?.user);
  const [typedMessage, setMessage] = useState("");
  const [reloadChat, setReloadChat] = useState(false);
  const [chatlistData, chatlistError, chatlistLoading, chatlistSetReload] =
    useFetch(
      `/chat/chat-list?userId=${auth?.userId ? auth?.userId : auth?.user}`
    );
  useEffect(() => {
    // this is fetching of the real time chat
    const interval = setInterval(() => {
      setReloadChat(true);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const handleChatDisplay = (e) => {
    const chtObj = chatlistData?.data?.find((item) => item.id === e.target.id);
    setConversationPersonImg(
      chtObj?.message?.receiverId?.id === tid
        ? chtObj?.message?.senderId
        : chtObj?.message?.receiverId
    );
    setConversationId(e.target.id);
  };

  const handleMessageSend = async () => {
    if (typedMessage && handleMessageSend !== "") {
      await axios
        .post(`/chat/send-message?receiverId=${conversationPersonImg.id}`, {
          senderId: tid,
          message: typedMessage,
        })
        .then((res) => {
          setReloadChat(true);
          setMessage("");
        });
    } else {
      toast.info("Type some message");
    }
  };

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
            <ul className="">
              {chatlistData?.data?.map((ele) => (
                <li
                  id={ele.id}
                  className="list-none flex p-2 w-full cursor-pointer hover:bg-[#04775a] rounded"
                  onClick={handleChatDisplay}
                >
                  <div className="w-16">
                    <img
                      id={ele.id}
                      alt="user-profile-pic"
                      src={`${properties.URLS.BASE_URL_DEV}/uploads/user/${
                        ele?.message?.receiverId?.id === tid
                          ? ele?.message?.senderId?.sprofilepicUrl
                          : ele?.message?.receiverId?.sprofilepicUrl
                      }`}
                      style={{
                        aspectRatio: 1 / 1,
                        objectFit: "cover",
                        borderRadius: "40%",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg";
                      }}
                    />
                  </div>
                  <div
                    style={{ borderBottom: "1px solid" }}
                    className="ml-3 w-full "
                  >
                    <h3
                      className="text-xl font-medium"
                      img="it img"
                      id={ele.id}
                    >
                      {ele?.message?.receiverId?.id === tid
                        ? ele?.message?.senderId?.sname
                        : ele?.message?.receiverId?.sname}
                    </h3>
                    {ele?.message?.message.length > 20 ? (
                      <p className="" id={ele.id}>
                        {ele?.message?.message?.substring(0, 20)}...
                      </p>
                    ) : (
                      <p className="" id={ele.id}>
                        {ele?.message?.message}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {conversationPersonImg !== null ? (
          <div className="col-start-3 col-end-12 px-2 h-[91vh]">
            <div
              className="flex p-2 w-full pb-3 items-center"
              style={{ borderBottom: "1px solid" }}
            >
              <div className="w-16">
                <img
                  alt="user-profile-pic"
                  src={`${properties.URLS.BASE_URL_DEV}/uploads/user/${conversationPersonImg?.sprofilepicUrl}`}
                  style={{
                    aspectRatio: 1 / 1,
                    objectFit: "cover",
                    borderRadius: "40%",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg";
                  }}
                />
              </div>
              <div className="ml-3 w-full">
                <h1 className="text-white text-3xl font-medium ">
                  {conversationPersonImg?.sname}
                </h1>
              </div>
            </div>
            {conversation !== "" ? (
              <ChatConversation
                conversationId={conversation}
                tid={tid}
                reload={reloadChat}
                setReload={setReloadChat}
              />
            ) : (
              <div
                className="px-3 py-2 scrollable-content overflow-y-auto h-[82%] pb-3"
                style={{ borderBottom: "1px solid" }}
              >
                <div className="flex justify-center items-center">
                  <p className="text-2xl">Select chat from chat list...</p>
                </div>
              </div>
            )}
            <div className="mt-3 justify-center flex items-center">
              <div className="border-2 border-emerald-700 rounded-lg py-2 px-2 flex items-center w-[90%] mr-3">
                <input
                  type="text"
                  value={typedMessage}
                  placeholder="Message"
                  className="px-2 border-none outline-none w-[100%] "
                  style={{ backgroundColor: "#012628" }}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  className="bg-emerald-700 p-3 rounded-full"
                  onClick={handleMessageSend}
                >
                  <IoMdSend />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-start-3 col-end-12 px-2 h-[91vh]">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-64 mb-5">
                <img
                  src="/images/emptyChatimg.png"
                  style={{
                    aspectRatio: 1 / 1,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <p className="text-3xl">Select chat from chat list...</p>
            </div>
          </div>
        )}
      </div>
    </Home>
  );
};

export default ChatSection;
