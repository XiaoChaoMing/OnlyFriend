"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "@/app/socket/socketContext";
import {
  getLocalStorageItem,
  openCenteredWindow,
  setLocalStorageItem,
} from "@/app/utils";
import { callTo } from "@/app/store/slice";
import { RootState } from "@/app/store/store";
import ReactHowler from "react-howler";

const CallModal = () => {
  const ws = useContext(SocketContext);
  const localData = getLocalStorageItem("curFriend") as any;
  const curUser = localData?.Users_Followers_followingIdToUsers;
  const dispatch = useDispatch();
  const call = useSelector((state: RootState) => state.videoCall.callTo);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDeniteCall = () => {
    if (ws) {
      ws.emit("cancel-call", {
        fromUserId: localData.folowerId,
        toUserId: curUser.id,
      });
    }
    dispatch(callTo(false));
  };

  const handleAcceptCall = () => {
    setLocalStorageItem("isHear", true);
    dispatch(callTo(false));
    openCenteredWindow(
      "http://localhost:3000/videoCall",
      "videoCall",
      1200,
      700
    );
  };

  useEffect(() => {
    setIsPlaying(call);
  }, [call]);

  return (
    <div className="bg-gray-300 w-[300px] fixed bottom-3 right-2 rounded-md p-2">
      <ReactHowler src="/callingSound.mp3" playing={isPlaying} loop />

      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center">
          <div className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
            <Image
              src={curUser.Avatar}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
          <p className="pt-2">
            User {curUser.firstName} {curUser.lastName} is calling ...
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="bg-green-500 rounded-3xl w-[80px] py-1"
            onClick={handleAcceptCall}
          >
            <PhoneIcon sx={{ color: "white" }} />
          </button>
          <button
            type="button"
            className="bg-red-500 rounded-3xl w-[80px] py-1"
            onClick={handleDeniteCall}
          >
            <PhoneDisabledIcon sx={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
