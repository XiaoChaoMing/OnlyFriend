"use client";
import React from "react";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import ImageGalery from "./ImageGalery";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
// Import Swiper styles
import "swiper/css";

const Post = () => {
  return (
    <div className="flex flex-col gap-2 px-8 py-4 bg-white w-full h-fit rounded-xl">
      <div className="flex flex-row items-center">
        {/* user info */}
        <div className="flex flex-row flex-1 gap-2 items-center">
          <Image
            src={`/avatar.jpg`}
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full"
          ></Image>
          <p className=" text-sm font-medium">Friend name</p>
        </div>
        {/* post item */}
        <div className="flex flex-row gap-2">
          <MoreHorizIcon sx={{ fontSize: "24px", color: "grey" }} />
          <CloseIcon sx={{ fontSize: "24px", color: "grey" }} />
        </div>
      </div>
      <p className="text-sm font-medium"> dau buoi</p>
      <div className=" max-w-screen-sm">
        <ImageGalery />
      </div>
      <div className="flex flex-row items-center gap-7">
        <FavoriteBorderIcon sx={{ fontSize: "25", color: "grey" }} />
        <ChatBubbleOutlineIcon sx={{ fontSize: "25", color: "grey" }} />
        <ShareIcon sx={{ fontSize: "25", color: "grey" }} />
        <div className="flex flex-row flex-1 items-center gap-2 bg-slate-300 rounded-full p-2">
          <input
            className="flex-1 h-8 pl-4 bg-transparent outline-none border-none"
            type="text"
            placeholder="write comment"
          />
          <SendIcon
            className="hover:scale-110 ease-in-out cursor-pointer hover:text-blue-500"
            sx={{ fontSize: "25", color: "grey" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
