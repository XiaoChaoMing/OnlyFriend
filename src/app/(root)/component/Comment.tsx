"use client";
import React, { useEffect, useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import Card from "../../../../components/layout/Card";
import CommentRepply from "./CommentRepply";
import { GET_method } from "@/app/utils/fetchApi";
import { SocketContext } from "@/app/socket/socketContext";
import { SessionContext } from "next-auth/react";

interface CommentProps {
  commentId?: number;
  userName?: string;
  comment?: string;
  Avatar?: string;
  CmtUserId?: string;
  cmtQuantity?: number;
  postId?: number;
}

const Comment: React.FC<CommentProps> = ({
  userName,
  comment,
  Avatar,
  commentId,
  CmtUserId,
  cmtQuantity,
  postId,
}) => {
  const ws = useContext(SocketContext);
  const session = useContext(SessionContext);
  const userId = session?.data?.data.user.id;
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [listReply, setListReply] = useState<any[] | null>(null);
  const [reply, setReply] = useState("");

  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const fetchCommentReply = useCallback(async () => {
    if (commentId) {
      const listReply = await GET_method(
        `/post/get-comment-reply?commentId=${commentId}`
      );
      setListReply(listReply.data);
      console.log(listReply.data);
    }
  }, [commentId]);

  const handleReplySubmit = () => {
    const replyCmt = {
      parentCommentId: commentId,
      ReplyById: userId,
      replyText: reply,
    };
    const newNotify = {
      notifyTypeId: "6",
      userId: CmtUserId,
      fromUserId: userId?.toString(),
      contents: JSON.stringify({
        Status: "Đã trả lời bình luận của bạn",
        cmtRep: reply,
        id: postId,
      }),
    };
    if (ws) {
      ws.emit("replyCmt", replyCmt);
      ws.emit("createNotify", newNotify);
    }
    setShowReplyInput(!showReplyInput);
    setReply("");
  };

  useEffect(() => {
    const loadNewReply = (newReply: any) => {
      setListReply((prevList) => [...(prevList || []), newReply.content]);
    };
    if (ws) {
      ws.on("newReply", loadNewReply);
    }
    return () => {
      ws?.off("newReply", loadNewReply);
    };
  }, [ws]);

  useEffect(() => {
    if (showReplies) {
      fetchCommentReply();
    }
  }, [showReplies, fetchCommentReply]);

  return (
    <div className="my-4">
      <div className="flex flex-row items-baseline">
        <Card
          height={50}
          width={50}
          avartar={Avatar}
          className={`hover:bg-transparent`}
        />
        <div className="ml-4 w-full">
          <div className="flex flex-col bg-slate-300 rounded-md p-3">
            <h1 className="font-bold text-xl">{userName}</h1>
            <p>{comment}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={toggleReplyInput} className="text-blue-500">
                {showReplyInput ? "Cancel Reply" : "Reply"}
              </button>
              <button onClick={toggleReplies} className="text-blue-500">
                {showReplies ? "Hide Replies" : `Show Replies`}
              </button>
            </div>
            {showReplyInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={reply}
                  onChange={handleReplyChange}
                  placeholder="Write a reply..."
                  className="border rounded p-2 w-full"
                />
                <button
                  onClick={handleReplySubmit}
                  className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showReplies && (
        <div className="ml-16">
          {listReply?.map((reply) => {
            const fullName = reply.ById.firstName + " " + reply.ById.lastName;
            return (
              <CommentRepply
                userName={fullName}
                Avatar={reply.ById.Avatar}
                comment={reply.replyText}
                key={reply.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  userName: PropTypes.string,
  comment: PropTypes.string,
  Avatar: PropTypes.string,
  commentId: PropTypes.number,
};

export default Comment;
