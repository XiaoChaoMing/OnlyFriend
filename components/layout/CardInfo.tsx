import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
interface CardInforProp {
  className?: string;
  name: string;
  follower: number;
  liked: number;
}
const CardInfo: React.FC<CardInforProp> = ({
  className,
  name,
  follower,
  liked,
}) => {
  return (
    <div className="flex flex-row absolute left-[270px]">
      <div
        className={twMerge(`flex flex-col justify-center gap-2 `, className)}
      >
        <p className="text-[24px] font-bold">{name}</p>
        <p className="text-[17px] font-medium">
          {follower / 1000 + "K"} Người theo dõi•{liked / 1000 + "K"} Lượt thích
        </p>
        <AvatarGroup max={4} className="flex flex-row-reverse justify-end">
          <Avatar alt="Remy Sharp" src="/avatar.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </div>
    </div>
  );
};

CardInfo.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  follower: PropTypes.number.isRequired,
  liked: PropTypes.number.isRequired,
};

export default CardInfo;
