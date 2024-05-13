import React from "react";
import PropTypes from "prop-types";
import Card from "../../../../components/layout/Card";
import CommentRepply from "./CommentRepply";

interface CommentProps {
  userName?: string;
  comment?: string;
}
const Comment: React.FC<CommentProps> = ({ userName, comment }) => {
  return (
    <div>
      <div className="flex flex-row items-baseline">
        <Card height={60} width={60} className="hover:bg-transparent" />
        <div>
          <div className="flex flex-col bg-slate-300 rounded-md p-2">
            <h1 className="font-bold text-xl">minh nguyen</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
              perferendis eos reprehenderit? Quo nam dicta aliquid iusto
              officiis sit, accusantium optio odit incidunt ab aperiam ex
              cupiditate ullam autem sed.
            </p>
          </div>
        </div>
      </div>
      <div className="px-9">
        <CommentRepply />
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
