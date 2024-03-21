import React from "react";
import Menu from "./Menu";
import { groupList } from "./../../constants/index";

import { sidebarLinks } from "./../../constants/index";
const LeftSideBar = () => {
  return (
    <div className=" h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar bg-white rounded-tr-xl rounded-br-xl">
      <Menu listItem={sidebarLinks} />
      <p className=" text-xs font-bold text-gray-800">My Groups</p>
      <Menu listItem={groupList} />
    </div>
  );
};

export default LeftSideBar;
