import React from "react";
import Image from "next/image";
const Card = () => {
  return (
    <div className=" flex flex-row gap-4 items-center hover:bg-slate-200 p-3 rounded-xl">
      <Image
        src={`/avatar.jpg`}
        width={40}
        height={40}
        alt="Picture of the author"
        className="rounded-full"
      ></Image>
      <p className=" text-sm font-medium">Friend name</p>
    </div>
  );
};

export default Card;
