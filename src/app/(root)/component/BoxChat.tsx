"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "../../../../components/layout/Card";
import { listMessBox } from "../../../../constants";
import MenuIcont from "../../../../components/layout/MenuIcont";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setCloseBox } from "@/app/store/slice";
import { openCenteredWindow } from "@/app/utils";
interface MenuIcontProps {
  className?: string;
}
const BoxChat: React.FC<MenuIcontProps> = ({ className }) => {
  const boxChatState = useSelector((state: RootState) => state.boxChat.value);
  const dispatch = useDispatch();
  const handleBoxChat = (id: number | null | undefined) => {
    if (id === 4) {
      dispatch(setCloseBox());
    } else if (id === 3) {
      console.log(id);
    } else if (id === 2) {
      console.log(id);
    } else {
      openCenteredWindow("http://localhost:3000/videoCall", "test", 1200, 700);
    }
  };
  const message = [
    {
      id: "1",
      fromUserId: 1,
      toUserId: 2,
      message: "fn_test.mp4",
    },
  ];
  return (
    <div
      className={twMerge(
        `h-[470px] w-[350px] bg-[#303338] rounded-t-lg hidden ${
          boxChatState === 0 ? "hidden" : "block"
        }`,
        className
      )}
    >
      <div className="flex flex-row gap-2 p-0">
        <Card
          width={30}
          height={30}
          friendName="minh nguyen"
          className="text-white w-fit hover:bg-transparent"
        />
        <MenuIcont
          listItem={listMessBox}
          className="flex flex-row gap-0 justify-end pr-2 items-center text-white flex-grow"
          handleMenu={handleBoxChat}
        />
      </div>
      <div></div>
    </div>
  );
};

BoxChat.propTypes = {};

export default BoxChat;
