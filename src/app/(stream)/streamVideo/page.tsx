"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TopBar from "./component/TopBar";
import { SocketContext } from "@/app/socket/socketContext";
import { useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Menu, MenuItem } from "@mui/material";

const StreamPage: React.FC = () => {
  const ws = useContext(SocketContext);
  const { data: session } = useSession();
  const user = session?.data?.user;
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const initLocalStream = async (monitor: boolean) => {
    try {
      let localStream;
      if (monitor) {
        localStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: 1000,
            height: 800,
          },
          audio: true,
        });
      } else {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1000,
            height: 800,
          },
          audio: true,
        });
      }
      localStreamRef.current = localStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const handleStartStream = async () => {
    if (ws && user) {
      await createPeerConnection();
      const offer = await peerConnectionRef.current?.createOffer();
      await peerConnectionRef.current?.setLocalDescription(offer);
      ws.emit("roomOffer", { room: "room 2", offer: offer });
      ws.emit("joinRoom", { room: "room 2", userId: user.id });
      initLocalStream(true);
    }
  };

  const handleEndStream = () => {
    if (ws && user) {
      ws.emit("leaveRoom", { room: "room 2", userId: user.id });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
  };

  const createPeerConnection = async () => {
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnectionRef.current = peerConnection;
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        if (ws) {
          ws.emit("roomIcecadidate", {
            room: "room 2",
            candidate: event.candidate,
          });
        }
      }
    };
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-row justify-center gap-4 h-screen">
        <div className="w-[75%] bg-slate-500 flex flex-col gap-3 rounded-md p-2">
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon sx={{ fontSize: "30px", color: "white" }} />
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
                onClick={() => {
                  handleClose(), handleStartStream();
                }}
              >
                Start stream
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose(), handleEndStream();
                }}
              >
                End stream
              </MenuItem>
            </Menu>
          </div>
          <video
            ref={localVideoRef}
            style={{ width: "100%", height: "70%" }}
            className="rounded-md"
            autoPlay
            controls
            playsInline
          />
          <div className="w-full rounded-md h-[70px] overflow-hidden bg-slate-600 p-2">
            <h1 className="text-white">Stream description</h1>
          </div>
        </div>
        <div className="w-[20%] bg-slate-600 rounded-md flex flex-col">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

StreamPage.propTypes = {};

export default StreamPage;
