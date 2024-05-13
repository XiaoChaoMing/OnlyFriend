import React from "react";
import TopBar from "../component/TopBar";
import MessagePage from "./../component/MessagePage";
import FriendProfile from "./../component/FriendProfile";
import ChatList from "./../component/ChatList";

const page = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-row h-screen">
        <ChatList />
        <MessagePage />
        <FriendProfile />
      </div>
    </div>
  );
};

export default page;
