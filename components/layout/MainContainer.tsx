import React from "react";
import Topmaint from "./Topmaint";
import Post from "./Post";

const MainContainer = () => {
  return (
    <div className=" flex flex-col gap-3 h-screen min-w-[1200px] px-60 mx-2 overflow-auto ">
      <Topmaint />
      <div className="">
        <Post />
      </div>
    </div>
  );
};

export default MainContainer;
