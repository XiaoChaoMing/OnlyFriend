import Link from "next/link";
import React from "react";
import Image from "next/image";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { messageMenu } from "./../../../../../constants/index";
import BtnItem from "../../../../../components/layout/BtnItem";

const TopBar = () => {
  return (
    <div className=" w-screen top-0 sticky px-10 py-1 flex flex-row bg-white justify-between items-center">
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <Image
            src={`/logo.png`}
            width={250}
            height={500}
            alt="Picture of the author"
            className=" "
          />
        </Link>
        <div className=" h-14 w-[50%] rounded-3xl flex flex-row bg-gray-200 gap-3 p-3">
          <SearchIcon sx={{ color: "#124076", fontSize: "24px" }} />
          <input
            className=" outline-none border-none w-[85%] bg-transparent "
            type="text"
            placeholder="search whaterver you want !"
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 p-4">
        {messageMenu.map((item) => {
          return (
            <BtnItem key={item.label} content={item.label}>
              {item.icon}
            </BtnItem>
          );
        })}
      </div>
      <div className="flex flex-row gap-4 p-4">
        <div className="p-3 rounded-full bg-blue-200 flex items-center">
          <NotificationsIcon sx={{ color: "#124076", fontSize: "28px" }} />
        </div>
        <div className="p-3flex items-center">
          <Image
            src={`/avatar.jpg`}
            width={50}
            height={50}
            alt="Picture of the author"
            className=" rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
