import React from "react";
import Menu from "./../../../../../components/layout/Menu";
import { groupList, sidebarLinks } from "./../../../../../constants/index";

import Card from "./../../../../../components/layout/Card";

const ChatList = () => {
  const ListFriend = [
    {
      id: 1,
      name: "minh nguyen",
    },
    {
      id: 2,
      name: "xcm",
    },
    {
      id: 3,
      name: "loton1",
    },
  ];
  return (
    <div className=" h-screen w-[400px] left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-3 max-md:hidden custom-scrollbar bg-white rounded-tr-xl rounded-br-xl border-r ">
      {ListFriend.map((friend) => {
        return (
          <Card
            key={friend.id}
            height={40}
            width={40}
            friendName={friend.name}
            className="flex flex-row items-center gap-3"
          />
        );
      })}
    </div>
  );
};

export default ChatList;
