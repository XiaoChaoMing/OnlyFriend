"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "next-auth/react";
import { SocketContext } from "@/app/socket/socketContext";
import PendingCallPage from "../pendingCall/page";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { getLocalStorageItem, removeLocalStorageItem } from "@/app/utils";
import VideoCallmenu from "../chat/component/VideoCallmenu";
import { setEndCall } from "@/app/store/slice";

const VideoCallPage: React.FC = () => {
  const ws = useContext(SocketContext);
  const session = useContext(SessionContext);
  const [callPending, setCallPending] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const userId = session?.data?.data.user.id;
  const dispatch = useDispatch();
  const call = useSelector((state: RootState) => state.videoCall.call);
  const EndCall = useSelector((state: RootState) => state.videoCall.endCall);
  const localData = getLocalStorageItem("curFriend") as any;
  const isCall = getLocalStorageItem("isCall") as boolean;
  const isHear = getLocalStorageItem("isHear") as boolean;
  const currentFriend = localData?.Users_Followers_followingIdToUsers.id;

  useEffect(() => {
    if (!ws || !userId) {
      console.log("Socket or session not available");
      return;
    }

    const initializeCall = async () => {
      if (isCall) {
        startCall();
      }
      if (isHear) {
        await initLocalStream();
        ws.emit("accept", {
          fromUserId: localData?.Users_Followers_followingIdToUsers.id,
          toUserId: currentFriend,
        });
      }
    };
    const handleAccept = async () => {
      await handleCallAccepted();
    };
    const handleOffer = async (data: {
      offer: RTCSessionDescriptionInit;
      fromUserId: number;
      toUserId: number;
    }) => {
      if (!peerConnectionRef.current) await createPeerConnection();
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      ws.emit("answer", {
        answer,
        toUserId: data.fromUserId,
        fromUser: data.toUserId,
      });
    };
    const handleAnswer = async (data: {
      answer: RTCSessionDescriptionInit;
    }) => {
      console.log("answer", data.answer);
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    };
    const handleIceCandidate = async (data: {
      candidate: RTCIceCandidateInit;
    }) => {
      await peerConnectionRef.current?.addIceCandidate(
        new RTCIceCandidate(data.candidate)
      );
    };
    const handleReject = () => {
      removeLocalStorageItem("isCall");
      window.close();
    };
    const handleShutDown = () => {
      dispatch(setEndCall(true));
    };
    ws.emit("register", userId);
    ws.on("offer", handleOffer);
    ws.on("answer", handleAnswer);
    ws.on("ice-candidate", handleIceCandidate);
    ws.on("accept-call", handleAccept);
    ws.on("rejectCall", handleReject);
    ws.on("shutDown", handleShutDown);
    initializeCall();
    return () => {
      ws.off("offer", handleOffer);
      ws.off("answer", handleAnswer);
      ws.off("ice-candidate", handleIceCandidate);
      ws.off("accept-call", handleAccept);
      ws.off("rejectCall", handleReject);
      ws.off("shutDown", handleShutDown);
    };
  }, [ws, userId, call, setEndCall]);

  const initLocalStream = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };
  const createPeerConnection = async () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      console.log("ICE candidate event triggered");
      if (event.candidate) {
        console.log("ICE candidate generated:", event.candidate);
        if (ws) {
          console.log("WebSocket connection exists, sending ICE candidate");
          ws.emit("ice-candidate", {
            candidate: event.candidate,
            toUserId: currentFriend,
          });
        } else {
          console.log("WebSocket connection not available");
        }
      } else {
        console.log("ICE candidate is null");
      }
    };

    peerConnection.ontrack = (event) => {
      console.log("Track event received", event);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = localStream;

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      console.log("Local stream added to the peer connection");
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }

    peerConnectionRef.current = peerConnection;
  };
  const startCall = async () => {
    setCallPending(true);
    if (ws) {
      ws.emit("call-user", { fromUserId: userId, toUserId: currentFriend });
    }
  };
  const handleCallAccepted = async () => {
    setCallPending(false);

    await createPeerConnection();
    const offer = await peerConnectionRef.current?.createOffer();
    await peerConnectionRef.current?.setLocalDescription(offer);
    if (ws) {
      ws.emit("offer", { offer, toUserId: currentFriend, fromUserId: userId });
    }
    await initLocalStream();
  };
  const handleCallRejected = () => {
    setCallPending(false);
    if (ws) {
      ws.emit("cancel-call", { fromUserId: userId, toUserId: currentFriend });
    }
    removeLocalStorageItem("isCall");
    removeLocalStorageItem("isHear");
    window.close();
  };
  const handleOutOfCalling = () => {
    removeLocalStorageItem("isCall");
    removeLocalStorageItem("isHear");
    window.close();
  };
  if (EndCall) {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    if (ws) {
      ws.emit("end-call", {
        fromUserId: localData?.Users_Followers_followingIdToUsers.id,
        toUserId: currentFriend,
      });
    }
    return (
      <div className=" bg-black flex flex-col gap-10 items-center h-full">
        <p className="text-white font-semibold text-[23px]">
          This Call Was Ended
        </p>
        <button
          className="text-white font-medium text-[16px]"
          type="button"
          onClick={handleOutOfCalling}
        >
          Out This Call
        </button>
      </div>
    );
  }

  if (callPending) {
    return (
      <PendingCallPage
        fromUser={userId?.toString()}
        toUserId={currentFriend}
        onCallRejected={handleCallRejected}
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-[100vh] relative bg-gray-300">
      <video
        ref={remoteVideoRef}
        className="bg-red"
        style={{ width: "100vw", height: "100vh" }}
        muted
        autoPlay
        playsInline
      />
      <div className="bg-black absolute top-6 left-6 rounded-md border-[1px] border-white">
        <video
          ref={localVideoRef}
          className=""
          style={{ width: "400px", height: "250px" }}
          autoPlay
          playsInline
        />
      </div>
      <div className="flex flex-row gap-5 absolute bottom-2">
        <VideoCallmenu />
      </div>
    </div>
  );
};

export default VideoCallPage;
