import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { format, parseISO } from "date-fns";

const ChatConversation = ({ tid, conversationId, reload, setReload }) => {
  const [
    chatHistoryData,
    chatHistoryError,
    chatHistoryLoading,
    chatHistorySetReload,
  ] = useFetch(`/chat/chat-history?conId=${conversationId}`);

  const [messages, setMessages] = useState([]);

  // Update messages whenever new data is fetched
  useEffect(() => {
    if (chatHistoryData?.data?.messages) {
      setMessages(chatHistoryData.data.messages);
    }
  }, [chatHistoryData]);

  // Handle reload and reset flags
  useEffect(() => {
    chatHistorySetReload(false);
    setReload(false);
  }, [conversationId, reload]);

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const dateKey = format(parseISO(message.createdAt), "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages || []);

  return (
    <div
      className="px-3 py-2 scrollable-content overflow-y-auto h-[82%] pb-3"
      style={{ borderBottom: "1px solid" }}
    >
      {/* {chatHistoryLoading && <p>Loading...</p>} */}
      <ul className="chtSec">
        {Object.keys(groupedMessages).map((date) => (
          <React.Fragment key={date}>
            {/* Date Header */}
            <div className="flex justify-center my-3">
              <div className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                {format(parseISO(date), "dd MMM yyyy")}
              </div>
            </div>
            {/* Messages for the Day */}
            {groupedMessages[date]
              ?.sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              ?.map((msg) => (
                <li
                  key={msg._id}
                  className={`list-none mb-1 flex ${
                    msg.senderId === tid ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex ${
                      msg.senderId === tid ? "justify-end" : "justify-start"
                    }`}
                    style={{ width: "50%", textWrap: "wrap" }}
                  >
                    <div
                      className={`chat-${
                        msg.senderId === tid ? "right" : "left"
                      } w-fit p-3 flex items-end gap-2`}
                    >
                      <p className="text-xl" style={{ textWrap: "wrap" }}>
                        {msg.message}
                      </p>
                      <p className="text-xs text-gray-300">
                        {format(new Date(msg.createdAt), "hh:mm a")}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ChatConversation;
