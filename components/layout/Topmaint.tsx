"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { topMaintMenu } from "./../../constants/index";

import BtnItem from "./BtnItem";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setOpent } from "@/app/store/slice";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
interface TopmaintProps {
  groupId?: string;
}
const Topmaint: React.FC<TopmaintProps> = ({ groupId }) => {
  const session = useSession();
  const Avatar = session.data?.data.user.Avatar;
  const showModal = useSelector((state: RootState) => state.appAction.crPost);

  const dispatch = useDispatch();
  const handleOpent = () => {
    dispatch(setOpent());
  };
  return (
    <div className=" flex flex-col gap-2 px-8 py-4 bg-white w-full h-fit rounded-xl mb-2">
      {/* create post modal */}
      <PostModal postType={2} groupId={groupId} />
      <div className="flex flex-row gap-2 mt-2 h-[50px]">
        <div className=" h-[50px] w-[50px] relative overflow-hidden rounded-full">
          <Image
            src={Avatar ? Avatar.toString() : `/avatar.jpg`}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
          />
        </div>
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
