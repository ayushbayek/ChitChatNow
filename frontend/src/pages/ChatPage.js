import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chatData, setChatData] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/chat");
    setChatData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chatData.map((data) => (
        <div key={data._id}>{data.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
