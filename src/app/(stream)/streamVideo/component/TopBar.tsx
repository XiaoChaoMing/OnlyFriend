import Link from "next/link";
import React from "react";
import Image from "next/image";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useSession } from "next-auth/react";

const TopBar = () => {
  const session = useSession();
  const user = session.data?.data.user;
  return (
    <div className="w-screen top-0 sticky px-10 py-1 flex flex-row bg-white justify-between items-center">
      <div className="flex flex-row justify-between items-center">
        <Link href="/feed">
          <Image
            src="/logo.png"
            width={250}
            height={500}
            alt="Picture of the author"
            className=""
          />
        </Link>
        <div className="h-14 w-[50%] rounded-3xl flex flex-row bg-gray-200 gap-3 p-3">
          <SearchIcon sx={{ color: "#124076", fontSize: "24px" }} />
          <input
            className="outline-none border-none w-[85%] bg-transparent"
            type="text"
            placeholder="search whatever you want!"
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 p-4">
        <div className="p-3 rounded-full bg-blue-200 flex items-center">
          <NotificationsIcon sx={{ color: "#124076", fontSize: "28px" }} />
        </div>
        <div className="h-[50px] w-[50px] overflow-hidden rounded-full relative">
          <Image
            src={user?.Avatar ? user.Avatar.toString() : "/avatar.jpg"}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
