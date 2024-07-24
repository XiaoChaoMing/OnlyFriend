"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { SocketContext } from "@/app/socket/socketContext";

interface PendingCallPageProps {
  fromUser: string | undefined;
  toUserId: number;
  onCallRejected: () => void;
}

const PendingCallPage: React.FC<PendingCallPageProps> = ({
  fromUser,
  toUserId,
  onCallRejected,
}) => {
  const ws = useContext(SocketContext);

  useEffect(() => {
    if (!ws) {
      console.log("Socket not available");
      return;
    }

    const handleCallResponse = (data: { accepted: boolean }) => {
      if (data.accepted) onCallRejected();
    };

    ws.on("call-response", handleCallResponse);

    ws.emit("initiate-call", { fromUser, toUserId });

    return () => {
      ws.off("call-response", handleCallResponse);
    };
  }, [ws, fromUser, toUserId]);

  return (
    <div className="flex items-center justify-center h-[100vh] relative bg-black">
      <img
        className="h-full w-full object-cover filter blur-3xl"
        src="/avatar.jpg"
        alt=""
      />
      <div className="animate-ping absolute inline-flex h-[150px] w-[150px] rounded-full bg-white opacity-75"></div>
      <div className="animate-ping absolute inline-flex h-[200px] w-[200px] rounded-full bg-white opacity-75"></div>
      <div className="absolute z-30">
        <Image
          src={"/avatar.jpg"}
          height={200}
          width={200}
          className="rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-row gap-5 absolute bottom-2">
        <div className="bg-white rounded-full p-3" onClick={onCallRejected}>
          <PhoneDisabledIcon sx={{ fontSize: "30px", color: "#9BCF53" }} />
        </div>
      </div>
    </div>
  );
};

export default PendingCallPage;
