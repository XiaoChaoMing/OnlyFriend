import React from "react";

import Card from "./Card";

const RightSideBar = () => {
  return (
    <div className=" h-screen flex flex-col flex-1 gap-3 flex-2 bg-white px-8 py-4 rounded-tl-xl overflow-auto">
      <p className=" text-lg font-bold">List Friends</p>
      <div className=" flex flex-col gap-3">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default RightSideBar;
