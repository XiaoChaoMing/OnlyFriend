import React from "react";
import PropTypes from "prop-types";
import CardItem from "../component/CardItem";
const page = () => {
  return (
    <div className="flex flex-col gap-3 h-[86vh] min-w-[1200px] px-3 mx-2 overflow-x-hidden overflow-scroll relative">
      <h2 className=" text-heading3-bold">All shared</h2>
      <div className="flex flex-col gap-3">
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
};

page.propTypes = {};

export default page;
