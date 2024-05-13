"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Card from "../../../../components/layout/Card";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comment from "./Comment";
import ReelInteract from "./ReelInteract";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const BoxVideo = () => {
  const [showComment, setShowComment] = useState(false);
  const [mute, setMute] = useState(true);

  const handleMute = () => {
    setMute(!mute);
  };
  const toggleComment = (state: boolean) => {
    setShowComment(state);
  };
  return (
    <div className="w-full flex flex-row justify-center min-h-[86vh] snap-start snap-always">
      <div
        className={`h-full
              w-[600px]
              flex
              flex-row
              justify-center
              px-9
              relative
              rounded-lg
              overflow-hidden
              duration-500 ease-in-out transition-all
              z-40 ${
                showComment
                  ? "left-0 translate-x-0"
                  : "left-[50%] translate-x-[-50%]"
              }`}
      >
        <Card
          width={40}
          height={40}
          friendName="minh nguyen"
          className="hover:bg-transparent absolute top-0 z-30 left-2 text-white"
        />
        <div className="flex flex-row gap-3 items-center absolute z-30 text-white right-3 top-3">
          {mute ? (
            <VolumeOffIcon onClick={handleMute} sx={{ fontSize: "30px" }} />
          ) : (
            <VolumeDownIcon onClick={handleMute} sx={{ fontSize: "30px" }} />
          )}

          <MoreHorizIcon sx={{ fontSize: "30px" }} />
        </div>
        <div className=" absolute bottom-10 left-4 z-30 text-white ">
          <p>test2</p>
        </div>
        <div className="absolute inset-0 filter blur-lg">
          <Image
            layout="fill"
            objectFit="cover"
            src="/thumb2.png"
            alt="thumbnail"
          />
        </div>
        <video
          className={`rounded-lg absolute translate-y-[-50%] top-[50%]`}
          playsInline
          muted={mute}
          loop
          width="550"
          height="754"
          autoPlay
          preload="none"
        >
          <source src="/reels.mp4" type="video/mp4" />
        </video>
        <ReelInteract showCmt={toggleComment} />
      </div>
      <div
        className={`comment h-full p-3 w-[500px] bg-white duration-500 ease-in-out transition-all z-30 relative rounded-lg ${
          showComment
            ? "right-0 translate-x-0"
            : "right-[50%] translate-x-[60%]"
        }`}
      >
        <Comment />
      </div>
    </div>
  );
};

BoxVideo.propTypes = {};

export default BoxVideo;
