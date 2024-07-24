"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Card from "../../../../components/layout/Card";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comment from "./Comment";
import ReelInteract from "./ReelInteract";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Posts } from "../../../../type";
import { isImageOrVideoPath } from "@/app/utils";
import { GET_method } from "@/app/utils/fetchApi";
import { SocketContext } from "@/app/socket/socketContext";
import { SessionContext } from "next-auth/react";

interface BoxVideoProps {
  value: Posts;
}
const BoxVideo: React.FC<BoxVideoProps> = ({ value }) => {
  const ws = useContext(SocketContext);
  const session = useContext(SessionContext);
  const userId = session?.data?.data.user.id;
  const [showComment, setShowComment] = useState(false);
  const [mute, setMute] = useState(true);
  const [listComment, setListComment] = useState<any[] | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const handleMute = () => {
    setMute(!mute);
  };
  const toggleComment = (state: boolean) => {
    setShowComment(state);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };
  const handleCommentSubmit = () => {
    const Comment = {
      commentText: newComment,
      userId: userId,
      postId: value.id,
    };
    setNewComment("");
    if (value.id && ws) {
      ws.emit("createdComment", Comment);
    }
  };
  const fetchReaction = useCallback(async (postid: string) => {
    const postReaction = await GET_method(
      `/post/get-post-reactions?postId=${postid}`
    );
    setListComment(postReaction.data);
    console.log(postReaction.data);
  }, []);
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
  useEffect(() => {
    fetchReaction(value.id.toString());
  }, [value, fetchReaction]);
  return (
    <div className="w-full flex flex-row justify-center min-h-[86vh] snap-start snap-always">
      <div
        className={`h-full
              w-[600px]
              flex
              flex-row
              justify-center
              px-9
              relative
              rounded-lg
              overflow-hidden
              duration-500 ease-in-out transition-all
              z-40 ${
                showComment
                  ? "left-0 translate-x-0"
                  : "left-[50%] translate-x-[-50%]"
              }`}
      >
        <Card
          width={40}
          height={40}
          friendName={value.Users.firstName + "" + value.Users.lastName}
          avartar={value.Users.Avatar}
          className="hover:bg-transparent absolute top-0 z-30 left-2 text-white"
        />
        <div className="flex flex-row gap-3 items-center absolute z-30 text-white right-3 top-3">
          {mute ? (
            <VolumeOffIcon onClick={handleMute} sx={{ fontSize: "30px" }} />
          ) : (
            <VolumeDownIcon onClick={handleMute} sx={{ fontSize: "30px" }} />
          )}

          <MoreHorizIcon sx={{ fontSize: "30px" }} />
        </div>
        <div className=" absolute bottom-10 left-4 z-30 text-white ">
          <p>{value.Status}</p>
        </div>
        {value.PostMedia.map((media) => {
          if (isImageOrVideoPath(media.mediaFile) === "video") {
            return (
              <video
                key={media.id}
                className={`rounded-lg absolute translate-y-[-50%] top-[50%] z-20`}
                muted={mute}
                loop
                width="550"
                height="754"
                autoPlay
                preload="none"
              >
                <source src={media.mediaFile} type="video/mp4" />
              </video>
            );
          } else {
            return (
              <div key={media.id} className="absolute inset-0 filter blur-lg">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={media.mediaFile}
                  alt="thumbnail"
                />
              </div>
            );
          }
        })}

        <ReelInteract showCmt={toggleComment} />
      </div>
      <div
        className={`comment h-full p-3 w-[500px] bg-white duration-500 ease-in-out transition-all z-30 relative rounded-lg ${
          showComment
            ? "right-0 translate-x-0"
            : "right-[50%] translate-x-[60%]"
        }`}
      >
        {listComment?.map((comment) => {
          const fullname = `${comment.Users.firstName} ${comment.Users.lastName}`;
          return (
            <Comment
              key={comment.id}
              commentId={comment.id}
              userName={fullname}
              comment={comment.commentText}
              Avatar={comment.Users.Avatar}
              cmtQuantity={comment._count.reply}
            />
          );
        })}
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300 flex items-center">
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
      </div>
    </div>
  );
};

BoxVideo.propTypes = {};

export default BoxVideo;
