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
        <div className="bg-blue-500 rounded-md p-2 h-[400px] w-[500px] relative">
          <Image
            src={msgText}
            layout="fill"
            objectFit="contain"
            className="rounded-md p-2"
            alt="Picture of the author"
          />
        </div>
      );
    } else if (isImageOrVideoPath(msgText) === "video") {
      return (
        <video
          className="bg-blue-500 rounded-md p-2"
          playsInline
          muted
          loop
          width="550"
          height="754"
          autoPlay
          preload="none"
        >
          <source src={msgText} />
        </video>
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
