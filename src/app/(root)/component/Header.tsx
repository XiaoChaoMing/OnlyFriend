"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Card from "./../../../../components/layout/Card";
import CardInfo from "../../../../components/layout/CardInfo";
import Button from "../../../../components/layout/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { setFollow, setUnfollow } from "@/app/store/slice";
const Header = () => {
  const follow = useSelector((state: RootState) => state.follow.value);
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(follow ? setUnfollow() : setFollow());
  };
  return (
    <div className="h-[700px] w-full bg-white relative rounded-md">
      <div className="h-[500px] w-full overflow-hidden rounded-md">
        <Image
          src={"https://tiki.vn/blog/wp-content/uploads/2023/08/thumb-22.jpg"}
          layout="responsive"
          width={1100}
          height={400}
          objectFit="cover"
          alt="db"
        />
      </div>
      <Card
        className="w-fit bg-white gap-0 rounded-full absolute bottom-7 left-12"
        width={200}
        height={200}
      />
      <CardInfo />
      <div className=" absolute right-12 bottom-14">
        {follow ? (
          <Button handleFunc={handleFollow} text="Following" />
        ) : (
          <Button
            handleFunc={handleFollow}
            text="Unfollow"
            className=" bg-slate-500"
          />
        )}
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
