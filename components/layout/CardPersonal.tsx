import React from "react";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import ErrorIcon from "@mui/icons-material/Error";
const CardPersonal = () => {
  return (
    <div className="bg-white p-3 rounded-md">
      <p className="text-[24px] font-bold">Introduce</p>
      <div className="p-3">
        <p>information</p>
      </div>
      <Divider />
      {/* infomation */}
      <div className="flex flex-col gap-3 mt-2">
        <a className="flex flex-row gap-2" href="#">
          <ErrorIcon />
          loton1.com
        </a>
        <a className="flex flex-row gap-2" href="#">
          <EmailIcon />
          minhvip01350@gmail.com
        </a>
      </div>
    </div>
  );
};

CardPersonal.propTypes = {};

export default CardPersonal;
