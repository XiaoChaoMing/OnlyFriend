import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { isImageOrVideoPath } from "@/app/utils/index";
interface MSGSendProps {
  msgText: string;
  className?: string;
}
const MessageSend: React.FC<MSGSendProps> = ({ msgText, className }) => {
  const message = (msgText: string) => {
    if (isImageOrVideoPath(msgText) === "image") {
      return (
        <div className="relative w-[400px] h-[250px]">
          <Image
            src={msgText}
            layout="fill"
            objectFit="cover"
            alt="Received Image"
            className="rounded-lg"
          />
        </div>
      );
    } else if (isImageOrVideoPath(msgText) === "video") {
      return (
        <div className="relative w-[400px] h-[250px]">
          <video
            playsInline
            muted
            loop
            autoPlay
            preload="none"
            className="w-full h-full rounded-lg"
            controls
          >
            <source src={msgText} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (isImageOrVideoPath(msgText) === "audio") {
      return (
        <div className="relative w-[400px] h-[40px]">
          <audio
            playsInline
            preload="none"
            className="w-full h-full rounded-lg"
            controls
          >
            <source src={msgText} type="video/mp4" />
            Your browser does not support the video tag.
          </audio>
        </div>
      );
    } else {
      return (
        <p className="bg-blue-500 rounded-md px-3 py-2 text-white">{msgText}</p>
      );
    }
  };
  return (
    <div className={twMerge(`flex flex-row justify-end`, className)}>
      {message(msgText)}
    </div>
  );
};

MessageSend.propTypes = {};

export default MessageSend;
