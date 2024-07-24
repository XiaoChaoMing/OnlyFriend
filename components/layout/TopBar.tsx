"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setDraw, setIndraw } from "@/app/store/slice";
import Badge from "@mui/material/Badge";
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";
import SearchModal from "./SearchModal";
import { RootState } from "@/app/store/store";
import { SocketContext } from "@/app/socket/socketContext";
const TopBar = () => {
  const ws = useContext(SocketContext);
  const session = useSession();
  const UserId = session.data?.data.user.id;
  const Avatar = session.data?.data.user.Avatar;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const initListNotify = useSelector(
    (state: RootState) => state.listNotify.value
  );
  const [listNotify, SetListNotify] = useState<any[] | null>([]);
  const handleDraw = () => {
    dispatch(setDraw());
  };
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    SetListNotify(initListNotify);
  }, [initListNotify]);
  useEffect(() => {
    if (!ws || !UserId) {
      console.log("Socket or session not available");
      return;
    }
    const handleNewNotify = (newNotify: any) => {
      SetListNotify([...(listNotify || []), newNotify]);
    };
    ws.on("newNotify", handleNewNotify);
    return () => {
      ws.off("newNotify", handleNewNotify);
    };
  });
  return (
    <div className=" w-screen top-0 sticky px-10 py-1 flex flex-row bg-white justify-between items-center">
      <SearchModal show={show} handleShow={handleShow} />
      <Link href="/">
        <Image
          src={`/logo.png`}
          width={250}
          height={500}
          alt="Picture of the author"
          className=" "
        />
      </Link>
      <div
        onClick={handleShow}
        className=" w-[50%] rounded-3xl flex flex-row bg-gray-200 gap-3 p-3"
      >
        <SearchIcon sx={{ color: "#124076", fontSize: "30px" }} />
        <input
          className=" outline-none border-none w-[85%] bg-transparent "
          type="text"
          placeholder="search whaterver you want !"
        />
      </div>
      <div className="flex flex-row gap-4 p-4">
        <div className="p-3 rounded-full bg-blue-200 flex items-center">
          <Link href="/chat">
            <Badge badgeContent={0} color="warning">
              <MessageIcon sx={{ color: "#124076", fontSize: "28px" }} />
            </Badge>
          </Link>
        </div>
        <div className="p-3 rounded-full bg-blue-200 flex items-center">
          <Badge badgeContent={listNotify?.length} color="warning">
            <NotificationsIcon
              onClick={handleDraw}
              sx={{ color: "#124076", fontSize: "28px" }}
            />
          </Badge>
        </div>

        <div className=" overflow-hidden h-[50px] w-[50px] relative rounded-full">
          <Image
            src={Avatar ? Avatar.toString() : "/avatar.jpg"}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <SignInBtn />
      </div>
    </div>
  );
};

export default TopBar;
