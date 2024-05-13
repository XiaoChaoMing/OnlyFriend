import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
interface CardInforProp {
  className?: string;
}
const CardInfo: React.FC<CardInforProp> = ({ className }) => {
  const cardInfor = [
    {
      id: 1,
      name: "Page Name",
      follower: "100K Người theo dõi",
      like: "190K Lượt thích",
    },
  ];
  return (
    <div className="flex flex-row absolute left-[270px]">
      {cardInfor.map((info) => {
        return (
          <div
            key={info.id}
            className={twMerge(
              `flex flex-col justify-center gap-2 `,
              className
            )}
          >
            <p className="text-[24px] font-bold">{info.name}</p>
            <p className="text-[17px] font-medium">
              {info.follower}•{info.like}
            </p>
            <AvatarGroup max={4} className="flex flex-row-reverse justify-end">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </div>
        );
      })}
    </div>
  );
};

CardInfo.propTypes = {};

export default CardInfo;
