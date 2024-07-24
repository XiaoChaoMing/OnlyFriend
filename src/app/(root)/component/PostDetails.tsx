"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import ImageGalery from "../../../../components/layout/ImageGalery";
import { setInactive } from "@/app/store/slice";
import Comment from "./Comment";
import { GET_method } from "@/app/utils/fetchApi";
import { SocketContext } from "@/app/socket/socketContext";
import { SessionContext } from "next-auth/react";

const PostDetails = () => {
  const ws = useContext(SocketContext);
  const session = useContext(SessionContext);
  const userId = session?.data?.data.user.id;
  const active = useSelector((state: RootState) => state.appAction.active);
  const post = useSelector((state: RootState) => state.post.value);
  const [like, setLike] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [listComment, setListComment] = useState<any[] | null>(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    setNewComment("");
    dispatch(setInactive());
  };

  const createNewNotify = (content: any) => {
    const newNotify = {
      notifyTypeId: "3",
      userId: post?.userId,
      fromUserId: userId,
      contents: content,
    };
    if (ws) {
      ws.emit("createNotify", newNotify);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const fetchReaction = useCallback(async (postid: string) => {
    const postReaction = await GET_method(
      `/post/get-post-reactions?postId=${postid}`
    );
    setListComment(postReaction.data);
  }, []);

  const handleCommentSubmit = () => {
    const Comment = {
      commentText: newComment,
      userId: userId,
      postId: post?.id.toString(),
    };
    setNewComment("");
    if (post?.id && ws) {
      ws.emit("createdComment", Comment);
      if (!(post?.userId === userId)) {
        const content = {
          Status: newComment,
          id: post?.id,
        };
        createNewNotify(JSON.stringify(content));
      }
    }
  };

  useEffect(() => {
    if (post?.id) {
      fetchReaction(post.id.toString());
    }
  }, [post?.id, fetchReaction]);

  useEffect(() => {
    const handleLoadNewComment = (newComment: any) => {
      setListComment((prevList) => [...(prevList || []), newComment.content]);
    };
    if (ws) {
      ws.on("newComment", handleLoadNewComment);
    }
    return () => {
      ws?.off("newComment", handleLoadNewComment);
    };
  }, [ws]);

  return (
    <div
      className={`z-50 absolute h-screen w-screen bg-black opacity-30 ${
        active ? "block" : "hidden"
      }`}
    >
      <Modal
        open={active}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="overflow-scroll scrollbar-hide h-[900px] overflow-x-hidden outline-none relative"
          sx={{
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
          <div className="shadow-lg rounded-md">
            <ImageGalery imageList={post?.PostMedia} />
          </div>
          <div className="flex flex-row justify-evenly p-3 border-t border-b border-gray-400 ">
            {like ? (
              <FavoriteIcon
                onClick={() => {
                  setLike(false);
                }}
                className="hover:scale-105 hover:text-pink-600 cursor-pointer"
                sx={{ fontSize: "25", color: "#FF407D" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => {
                  setLike(true);
                }}
                className="hover:scale-105 hover:text-pink-600 cursor-pointer"
                sx={{ fontSize: "25", color: "grey" }}
              />
            )}
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
            {listComment?.map((comment) => {
              const fullname = `${comment.Users.firstName} ${comment.Users.lastName}`;
              return (
                <Comment
                  key={comment.id}
                  commentId={comment.id}
                  userName={fullname}
                  CmtUserId={comment.Users.id}
                  comment={comment.commentText}
                  Avatar={comment.Users.Avatar}
                  postId={post?.id}
                  cmtQuantity={comment._count.reply}
                />
              );
            })}
          </div>
          <div className="sticky bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              className="flex-1 border rounded p-2 mr-2"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white py-1 px-3 rounded"
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

PostDetails.propTypes = {};

export default PostDetails;
