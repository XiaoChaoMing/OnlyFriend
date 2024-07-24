import React from "react";
import PropTypes from "prop-types";
import Card from "../../../../components/layout/Card";

interface CommentReplyProps {
  userName?: string;
  comment?: string;
  Avatar?: string;
}
const CommentRepply: React.FC<CommentReplyProps> = ({
  userName,
  comment,
  Avatar,
}) => {
  return (
    <div>
      <div className="flex flex-row items-baseline">
        <Card
          avartar={Avatar}
          height={40}
          width={40}
          className="hover:bg-transparent"
        />
        <div>
          <div className="flex flex-col bg-slate-300 rounded-md p-2">
            <h1 className="font-bold text-xl">{userName}</h1>
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentRepply.propTypes = {};

export default CommentRepply;
