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

interface HeaderProps {
  maintImage: string;
  wallPaper: string;
  name: string;
  follower: number;
  liked: number;
  description: {
    info: string;
    email: string;
  };
}
const Header: React.FC<HeaderProps> = ({
  maintImage,
  wallPaper,
  name,
  follower,
  liked,
  description,
}) => {
  const follow = useSelector((state: RootState) => state.follow.value);
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(follow ? setUnfollow() : setFollow());
  };
  return (
    <div className="h-[700px] w-full bg-white relative rounded-md">
      <div className="h-[500px] w-full overflow-hidden rounded-md">
        <Image
          src={wallPaper}
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
      <CardInfo name={name} follower={follower} liked={liked} />
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

Header.propTypes = {
  maintImage: PropTypes.string.isRequired,
  wallPaper: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  follower: PropTypes.number.isRequired,
  liked: PropTypes.number.isRequired,
  description: PropTypes.shape({
    info: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
