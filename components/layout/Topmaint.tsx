"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { topMaintMenu } from "./../../constants/index";

import BtnItem from "./BtnItem";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setOpent } from "@/app/store/slice";

const Topmaint = () => {
  const showModal = useSelector((state: RootState) => state.crPost.value);
  const dispatch = useDispatch();
  const handleOpent = () => {
    dispatch(setOpent());
  };
  return (
    <div className=" flex flex-col gap-2 px-8 py-4 bg-white w-full h-fit rounded-xl mb-2">
      {/* create post modal */}
      <PostModal />
      <div className="flex flex-row gap-2 mt-2">
        <Image
          src={`/avatar.jpg`}
          width={50}
          height={50}
          alt="Picture of the author"
          className="rounded-full"
        />
        <input
          onClick={handleOpent}
          className=" bg-slate-300 rounded-3xl px-5 w-[85%]"
          type="text"
          placeholder="write your status"
        />
      </div>
      <p className=" h-[2px] rounded-full w-[100%] bg-slate-300 my-3"></p>
      <div className="flex flex-row justify-between">
        {topMaintMenu.map((item) => {
          return (
            <BtnItem key={item.label} content={item.label}>
              {item.icon}
            </BtnItem>
          );
        })}
      </div>
    </div>
  );
};

export default Topmaint;
