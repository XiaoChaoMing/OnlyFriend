"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageGalery from "./ImageGalery";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import "swiper/css";
import { useDispatch } from "react-redux";
import { setActive, updateAdditionalValue } from "@/app/store/slice";
import { Posts } from "../../type";
import {
  Box,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { SessionContext } from "next-auth/react";
import { POST_method } from "@/app/utils/fetchApi";
import UpdateModal from "@/app/(message)/chat/component/UpdateModal";
import { SocketContext } from "@/app/socket/socketContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PostProp {
  value: Posts;
}

const Post: React.FC<PostProp> = ({ value }) => {
  const ws = useContext(SocketContext);
  const session = useContext(SessionContext);
  const userId = session?.data?.data.user.id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLike, setIslike] = useState(value.Reactions?.length);
  const [likeQuantity, setLikeQuantity] = useState(value._count.Reactions);
  const [newCmt, setNewCmt] = useState("");

  const dispatch = useDispatch();

  const handleShowUpdate = (state: boolean) => {
    setShowUpdate(state);
  };

  const handleClick = (event: any) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
    handleClose();
  };

  const handleUpdatePost = () => {
    handleShowUpdate(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const deletePost = async () => {
    const body = {
      postId: value.id,
    };
    const deletedPost = await POST_method(body, "/post/delete-post");
    console.log(deletedPost);
  };

  const handlePostdetails = () => {
    dispatch(updateAdditionalValue(value));
    dispatch(setActive());
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCmt(e.target.value);
  };
  const handleComment = async () => {
    const newComment = {
      commentText: newCmt,
      userId: userId,
      postId: value.id,
    };
    if (ws) {
      ws.emit("createdComment", newComment);
      setNewCmt("");
    }
  };

  const handleReactionPost = (postId: string, userId: string | undefined) => {
    if (ws) {
      ws.emit("reactPost", { postId, userId }, (res: any) => {
        if (res) {
          setIslike(true);
          setLikeQuantity(likeQuantity + 1);
        } else {
          setIslike(false);
          setLikeQuantity(likeQuantity - 1);
        }
      });
    }
  };
  useEffect(() => {
    if (!ws || !userId) {
      console.log("Socket or session not available");
      return;
    }
    const handleNewReact = (data: any) => {
      if (data.content) {
        setLikeQuantity(likeQuantity + 1);
      } else {
        setLikeQuantity(likeQuantity - 1);
      }
    };
    ws.on("newReact", handleNewReact);

    return () => {
      ws.off("newReact", handleNewReact);
    };
  });

  return (
    <div className="flex flex-col gap-2 px-8 py-4 bg-white w-full h-fit rounded-xl ">
      <div className="flex flex-row items-center">
        <div className="flex flex-row flex-grow gap-2 mt-2 h-[50px]">
          <Image
            src={value.Users.Avatar}
            width={50}
            height={50}
            alt="Picture of the author"
            className="rounded-full"
          ></Image>
          <p className=" text-sm font-medium leading-[3]">
            {value.Users.firstName}
            {value.Users.lastName}
          </p>
        </div>
        {userId === value.userId && (
          <div className="flex flex-row gap-2 ">
            <MoreHorizIcon
              onClick={handleClick}
              sx={{ fontSize: "24px", color: "grey" }}
            />
            <Popover
              id="click-popover"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handleClose}
            >
              <Box p={2} className="rounded-md">
                <Typography
                  className="cursor-pointer"
                  onClick={handleUpdatePost}
                >
                  Update Post
                </Typography>
                <Typography
                  className="cursor-pointer"
                  onClick={handleOpenConfirmation}
                >
                  Delete Post
                </Typography>
              </Box>
            </Popover>
          </div>
        )}
      </div>
      <p className="text-sm font-medium"> {value.Status}</p>
      {value.PostMedia.length > 0 && (
        <div className="max-w-screen-sm">
          <ImageGalery imageList={value.PostMedia} />
        </div>
      )}
      <div className="flex flex-row items-center gap-7">
        <div className="flex flex-row">
          {isLike ? (
            <FavoriteIcon
              className="cursor-pointer"
              onClick={() => {
                handleReactionPost(value.id.toString(), userId?.toString());
              }}
              sx={{ fontSize: "25", color: "#E90074" }}
            />
          ) : (
            <FavoriteBorderIcon
              className="cursor-pointer"
              onClick={() => {
                handleReactionPost(value.id.toString(), userId?.toString());
              }}
              sx={{ fontSize: "25", color: "grey" }}
            />
          )}

          <div>{likeQuantity}</div>
        </div>
        <ChatBubbleOutlineIcon
          onClick={handlePostdetails}
          sx={{ fontSize: "25", color: "grey" }}
        />
        <ShareIcon sx={{ fontSize: "25", color: "grey" }} />
        <div className="flex flex-row flex-1 items-center gap-2 bg-slate-300 rounded-full p-2">
          <input
            className="flex-1 h-8 pl-4 bg-transparent outline-none border-none"
            type="text"
            placeholder="write comment"
            onChange={handleCommentChange}
          />
          <SendIcon
            className="hover:scale-110 ease-in-out cursor-pointer hover:text-blue-500"
            sx={{ fontSize: "25", color: "grey" }}
            onClick={handleComment}
          />
        </div>
      </div>
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button
            onClick={() => {
              deletePost();
              handleCloseConfirmation();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <UpdateModal
        imageList={value.PostMedia}
        status={value.Status}
        show={showUpdate}
        postId={value.id}
        handleShow={handleShowUpdate}
      />
    </div>
  );
};

export default Post;
