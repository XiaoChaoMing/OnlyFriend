"use client";
import React, { MouseEventHandler, useState } from "react";
import PropTypes from "prop-types";
import { NotifyTypeCheck } from "@/app/utils";
import Image from "next/image";
import Card from "../../../../components/layout/Card";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Menu, MenuItem } from "@mui/material";
import { GET_method, POST_method } from "@/app/utils/fetchApi";
import { useDispatch } from "react-redux";
import { setActive, updateAdditionalValue } from "@/app/store/slice";

interface NotifyProps {
  notifyType: number;
  fromUser: any;
  notifyid: string;
  isRead: boolean;
  notifyContent: any;
  onDelete: (notifyId: string) => void;
}

const Notify: React.FC<NotifyProps> = ({
  notifyType,
  fromUser,
  notifyid,
  isRead,
  notifyContent,
  onDelete,
}) => {
  const notifyTitle = NotifyTypeCheck(notifyType);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isReads, setIsRead] = useState(isRead);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const content = JSON.parse(notifyContent);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteNotify = async (
    event: React.MouseEvent<HTMLLIElement>,
    notifyId: string
  ) => {
    event.stopPropagation();
    const deleted = await POST_method(
      {},
      `/notify/deleteNotify?nid=${notifyId}`
    );
    if (deleted) {
      onDelete(notifyId);
    }
  };
  const handleReadNotify = async (notifyId: string) => {
    const readNotify = await POST_method(
      {},
      `/notify/readNotify?nid=${notifyId}`
    );
    console.log(content);
    const Post = await GET_method(`/post/getPostById?pid=${content.id}`);
    if (readNotify) {
      dispatch(updateAdditionalValue(Post.data));
      dispatch(setActive());
      setIsRead(true);
    }
  };
  return (
    <div
      onClick={() => {
        handleReadNotify(notifyid);
      }}
      className="py-4 px-8 flex flex-row items-center relative w-full hover:bg-slate-200 rounded-md"
    >
      <Card
        height={40}
        width={40}
        avartar={fromUser.Avatar}
        className="flex flex-row items-center gap-3 hover:bg-transparent"
        friendName={fromUser.firstName + " " + fromUser.lastName}
      />
      <div className="flex flex-col flex-grow gap-1">
        <p className="text-[15px] font-semibold">{notifyTitle}</p>
        <p className="max-w-28 text-ellipsis">
          {content.Status}
          {content.cmtRep ? <p>: {content.cmtRep}</p> : ""}
        </p>
      </div>
      {isReads ? (
        ""
      ) : (
        <span className="h-[8px] w-[8px] bg-green-500 rounded-full absolute right-3 top-5"></span>
      )}
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(event) => handleDeleteNotify(event, notifyid)}
          className="text-slate-900"
        >
          <DeleteForeverIcon style={{ color: "#0f172ad9" }} />
          Delete Notify
        </MenuItem>
        <MenuItem onClick={handleClose} className="text-slate-900">
          <CheckIcon style={{ color: "#0f172ad9" }} />
          Mark as read
        </MenuItem>
      </Menu>
    </div>
  );
};

Notify.propTypes = {
  notifyType: PropTypes.number.isRequired,
  fromUser: PropTypes.any.isRequired,
  notifyid: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Notify;
