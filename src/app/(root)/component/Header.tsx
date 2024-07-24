"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Card from "../../../../components/layout/Card";
import CardInfo from "../../../../components/layout/CardInfo";
import Button from "../../../../components/layout/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { setFollow, setUnfollow } from "@/app/store/slice";
import SettingsIcon from "@mui/icons-material/Settings";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Box,
  FormControl,
  FormHelperText,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import UpdateGroup from "../group/component/UpdateGroup";
import { SocketContext } from "@/app/socket/socketContext";
import { useSession } from "next-auth/react";

interface IFormInput {
  groupImage: FileList;
  groupWall: FileList;
  groupName: string;
}

interface HeaderProps {
  Avatar?: string;
  firstName?: string;
  lastName?: string;
  Wall?: string;
  isAdmin?: boolean;
  groupImage?: string;
  groupWall?: string;
  groupId?: string;
  groupName?: string;
  follower?: number;
  _count?: {
    groupmember?: number;
  };
  description?: {
    info?: string;
    email?: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  Avatar,
  firstName,
  lastName,
  Wall,
  isAdmin,
  groupImage,
  groupWall,
  groupName,
  groupId,
  follower,
  _count,
  description,
}) => {
  const ws = useContext(SocketContext);
  const session = useSession();
  const UserId = session.data?.data.user.id;
  const follow = useSelector((state: RootState) => state.appAction.follow);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(follow ? setUnfollow() : setFollow());
  };

  return (
    <div className="h-[700px] w-[1240px] bg-white relative rounded-md">
      <div className="h-[500px] w-full overflow-hidden rounded-md">
        <Image
          src={groupWall || Wall || "/avatar.jpg"}
          layout="responsive"
          width={1100}
          height={400}
          objectFit="cover"
          alt="group wall"
        />
      </div>
      <Card
        className="w-fit bg-white gap-0 rounded-full absolute bottom-7 left-12"
        avartar={groupImage || Avatar || "/avatar.jpg"}
        width={200}
        height={200}
      />
      <CardInfo
        name={groupName || `${firstName} ${lastName}`}
        follower={_count?.groupmember || 10}
        liked={0}
      />
      <div className="absolute right-12 bottom-14 flex flex-row gap-3 items-center">
        <Button
          handleFunc={handleFollow}
          text={follow ? "Following" : "Unfollow"}
          className={follow ? "" : "bg-slate-500"}
        />
        {isAdmin && (
          <SettingsIcon
            onClick={() => {
              setShowUpdateModal(true);
            }}
            sx={{ color: "#64748b" }}
          />
        )}
      </div>
      <Modal
        open={showUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row items-center">
            <Typography
              className="flex-1 text-center"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {"Update Group"}
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <UpdateGroup groupId={groupId} />
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
