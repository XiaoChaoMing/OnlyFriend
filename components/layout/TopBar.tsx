"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setDraw, setIndraw } from "@/app/store/slice";
import Badge from "@mui/material/Badge";
import SignInBtn from "./SignInBtn";
const TopBar = () => {
  const dispatch = useDispatch();
  const handleDraw = () => {
    dispatch(setDraw());
  };
  return (
    <div className=" w-screen top-0 sticky px-10 py-1 flex flex-row bg-white justify-between items-center">
      <Link href="/">
        <Image
          src={`/logo.png`}
          width={250}
          height={500}
          alt="Picture of the author"
          className=" "
        />
      </Link>
      <div className=" w-[50%] rounded-3xl flex flex-row bg-gray-200 gap-3 p-3">
        <SearchIcon sx={{ color: "#124076", fontSize: "30px" }} />
        <input
          className=" outline-none border-none w-[85%] bg-transparent "
          type="text"
          placeholder="search whaterver you want !"
        />
      </div>
      <div className="flex flex-row gap-4 p-4">
        <div className="p-3 rounded-full bg-blue-200 flex items-center">
          <Link href="/chat">
            <Badge badgeContent={4} color="warning">
              <MessageIcon sx={{ color: "#124076", fontSize: "28px" }} />
            </Badge>
          </Link>
        </div>
        <div className="p-3 rounded-full bg-blue-200 flex items-center">
          <Badge badgeContent={4} color="warning">
            <NotificationsIcon
              onClick={handleDraw}
              sx={{ color: "#124076", fontSize: "28px" }}
            />
          </Badge>
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
        <SignInBtn />
      </div>
    </div>
  );
};

export default TopBar;
