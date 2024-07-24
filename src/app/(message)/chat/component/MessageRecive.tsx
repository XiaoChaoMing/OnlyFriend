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
  const message = (msgText: string) => {
    const mediaType = isImageOrVideoPath(msgText);

    if (mediaType === "image") {
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
    } else if (mediaType === "video") {
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
    } else if (mediaType === "audio") {
      return (
        <div className="relative w-[400px] h-[40px]">
          <audio
            playsInline
            muted
            preload="none"
            className="w-full h-full rounded-lg"
            controls
          >
            <source src={msgText} type="video/mp4" />
            Your browser does not support the video tag.
          </audio>
        </div>
      );
    } else if (mediaType === "text") {
      return (
        <p className="bg-gray-400 px-3 py-2 rounded-md text-white">{msgText}</p>
      );
    }
  };

  return (
    <div className={twMerge("w-fit max-w-full", className)}>
      {message(msgText)}
    </div>
  );
};

MessageRecive.propTypes = {
  msgText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MessageRecive;
