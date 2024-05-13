import React from "react";
import PropTypes from "prop-types";
import BoxVideo from "../component/BoxVideo";

const page = () => {
  return (
    <div className="flex flex-col gap-3 h-[86vh] min-w-[1200px] px-3 mx-2 overflow-x-hidden overflow-scroll snap-y snap-mandatory">
      <BoxVideo />
      <BoxVideo />
      <BoxVideo />
    </div>
  );
};

page.propTypes = {};

export default page;
