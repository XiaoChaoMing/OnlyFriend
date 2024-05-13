"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
interface CardProp {
  className?: string;
  height?: number;
  width?: number;
  friendName?: string;
  eventHandler?: () => void;
}
const Card: React.FC<CardProp> = ({
  className,
  height,
  width,
  friendName,
  eventHandler,
}) => {
  return (
    <div
      className={twMerge(
        ` flex flex-row gap-4 items-center hover:bg-slate-200 p-3 rounded-xl`,
        className
      )}
      onClick={eventHandler}
    >
      <Image
        src={`/avatar.jpg`}
        width={height}
        height={width}
        alt="Picture of the author"
        className="rounded-full"
      ></Image>
      <p className=" text-sm font-medium">{friendName}</p>
    </div>
  );
};

export default Card;
