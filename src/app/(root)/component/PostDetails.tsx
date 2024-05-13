"use client";
import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
// mui icont
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import ImageGalery from "../../../../components/layout/ImageGalery";
import { setInactive } from "@/app/store/slice";
import Comment from "./Comment";

const PostDetails = () => {
  const active = useSelector((state: RootState) => state.active.value);
  const post = useSelector((state: RootState) => state.post.value);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setInactive());
  };
  return (
    <div
      className={`z-50 absolute h-screen w-screen bg-black opacity-30 hidden ${
        active && "block"
      }`}
    >
      <Modal
        open={active}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="overflow-scroll scrollbar-hide h-[900px] overflow-x-hidden outline-none"
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            border: "hidden",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row items-center ">
            <Typography
              className="flex-1 text-center"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Bài Viết Của User
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={handleClose}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <div className=" shadow-lg rounded-md">
            <ImageGalery imageList={post?.image} />
          </div>
          <div className="flex flex-row justify-evenly p-3 border-t border-b border-gray-400 ">
            <FavoriteBorderIcon
              className="hover:scale-105 hover:text-pink-600 cursor-pointer"
              sx={{ fontSize: "25", color: "grey" }}
            />
            <ChatBubbleOutlineIcon
              className="hover:scale-105 hover:text-blue-500 cursor-pointer"
              sx={{ fontSize: "25", color: "grey" }}
            />
            <ShareIcon
              className="hover:scale-105 hover:text-green-600 cursor-pointer"
              sx={{ fontSize: "25", color: "grey" }}
            />
          </div>
          {/* comment list */}
          <div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

PostDetails.propTypes = {};

export default PostDetails;
