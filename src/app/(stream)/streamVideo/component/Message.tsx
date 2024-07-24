import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { User } from "../../../../../type";

interface MessageProps {
  user: User;
  msg: string;
}
const Message: React.FC<MessageProps> = ({ user, msg }) => {
  const fullName = user.firstName + " " + user.lastName;
  return (
    <div className="flex flex-row gap-2 rounded-sm">
      <div className="flex flex-col gap-1 items-center">
        <div className=" h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={user.Avatar || "/avatar.jpg"}
            layout="fill"
            objectFit="cover"
            alt="avatar"
          />
        </div>
        <p>{fullName}</p>
      </div>
      <p>{msg}</p>
    </div>
  );
};

Message.propTypes = {};

export default Message;
