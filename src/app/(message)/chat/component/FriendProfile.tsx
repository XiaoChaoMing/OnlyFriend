import React from "react";
import PropTypes from "prop-types";
import Card from "../../../../../components/layout/Card";

const FriendProfile = () => {
  return (
    <div className="flex-2 w-[400px]">
      <Card
        height={100}
        width={100}
        className="flex flex-col justify-center items-center hover:bg-transparent"
      />
    </div>
  );
};

FriendProfile.propTypes = {};

export default FriendProfile;
