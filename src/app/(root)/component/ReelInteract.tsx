import React, { useState } from "react";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
interface ReelInteracProps {
  showCmt: (newState: boolean) => void;
}
const ReelInteract: React.FC<ReelInteracProps> = ({ showCmt }) => {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  const handleShow = () => {
    setShow(!show);
    showCmt(!show);
  };
  return (
    <div className="flex flex-col gap-3 absolute bottom-3 right-3 ">
      <div
        className={`flex p-3  opacity-70  rounded-full transition-all duration-150 
      ${
        like
          ? "text-black bg-white hover:bg-gray-600"
          : "bg-gray-800 text-white"
      }`}
      >
        <ThumbUpIcon onClick={handleLike} />
      </div>
      <div className="flex p-3 bg-gray-800 text-white opacity-70 hover:bg-gray-600 rounded-full transition-all duration-150">
        <InsertCommentIcon onClick={handleShow} />
      </div>
      <div className="flex p-3 bg-gray-800 text-white opacity-70 hover:bg-gray-600 rounded-full transition-all duration-150">
        <BookmarkIcon />
      </div>
    </div>
  );
};

ReelInteract.propTypes = {};

export default ReelInteract;
