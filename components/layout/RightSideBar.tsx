"use client";
import React from "react";

import Card from "./Card";
import { useDispatch } from "react-redux";
import { setShow } from "@/app/store/slice";

const RightSideBar = () => {
  const dispatch = useDispatch();
  const openBoxChat = () => {
    dispatch(setShow());
  };
  const fridendList = [
    {
      id: 1,
      name: "minh nguyen",
    },
    {
      id: 2,
      name: "xcm149",
    },
    {
      id: 3,
      name: "loton1",
    },
  ];
  return (
    <div className=" h-screen flex flex-col flex-1 gap-3 flex-2 bg-white px-8 py-4 rounded-tl-xl overflow-auto">
      <p className=" text-lg font-bold">List Friends</p>
      <div className=" flex flex-col gap-3">
        {fridendList.map((fridend) => {
          return (
            <Card
              key={fridend.id}
              height={40}
              width={40}
              className="flex flex-row items-center gap-3"
              friendName={fridend.name}
              eventHandler={openBoxChat}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RightSideBar;
