import React from "react";
import PropTypes from "prop-types";

const LoadingPage = () => {
  return (
    <div className="h-[100vh] w-[100%] relative">
      <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%]">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
      </div>
    </div>
  );
};

LoadingPage.propTypes = {};

export default LoadingPage;
