import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { isImageOrVideoPath } from "@/app/utils/index";
interface MSGReciveProps {
  msgText: string;
  className?: string;
}
const MessageRecive: React.FC<MSGReciveProps> = ({ msgText, className }) => {
  // function isImageOrVideoPath(msgText: string) {
  //   const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  //   const videoExtensions = [".mp4", ".avi", ".mkv", ".mov", ".wmv"];
  //   const fileExtension = msgText
  //     .substring(msgText.lastIndexOf("."))
  //     .toLowerCase();
  //   if (imageExtensions.includes(fileExtension)) {
  //     return (
  //       <div>
  //         <Image
  //           src={msgText}
  //           width={500}
  //           height={500}
  //           alt="Picture of the author"
  //         />
  //       </div>
  //     );
  //   } else if (videoExtensions.includes(fileExtension)) {
  //     return "Đây là đường dẫn của một video.";
  //   } else {
  //     return <p className="text-white">{msgText}</p>;
  //   }
  // }
  const message = (msgText: string) => {
    if (isImageOrVideoPath(msgText) === "image") {
      return (
        <div>
          <Image
            src={msgText}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      );
    } else if (isImageOrVideoPath(msgText) === "video") {
      return (
        <video
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
    } else if (isImageOrVideoPath(msgText) === "text") {
      return <p className="text-white">{msgText}</p>;
    }
  };
  return (
    <div
      className={twMerge(` bg-gray-500 px-3 py-2 rounded-md w-fit`, className)}
    >
      {message(msgText)}
    </div>
  );
};

MessageRecive.propTypes = {};

export default MessageRecive;
