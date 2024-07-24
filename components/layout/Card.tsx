"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
interface CardProp {
  className?: string;
  height?: number;
  width?: number;
  friendName?: string;
  avartar?: string;
  eventHandler?: () => void;
  userHandler?: () => any;
}
const Card: React.FC<CardProp> = ({
  className,
  height,
  width,
  friendName,
  avartar,
  eventHandler,
}) => {
  return (
    <div
      className={twMerge(
        ` flex flex-row gap-4 items-center hover:bg-slate-200 p-3 `,
        className
      )}
      onClick={eventHandler}
    >
      <div className="relative" style={{ width: width, height: height }}>
        <Image
          src={avartar ? avartar : `/avatar.jpg`}
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
          className="rounded-full"
        ></Image>
      </div>

      {friendName && <p className=" text-sm font-medium">{friendName}</p>}
    </div>
  );
};

export default Card;
