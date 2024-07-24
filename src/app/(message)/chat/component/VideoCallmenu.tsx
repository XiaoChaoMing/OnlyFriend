import React, { useState } from "react";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useDispatch } from "react-redux";
import { setEndCall } from "@/app/store/slice";

const VideoCallmenu = () => {
  const [mute, setMute] = useState<boolean>(true);
  const [videoOff, setVideoOff] = useState<boolean>(true);
  const dispatch = useDispatch();
  const handleEndCall = () => {
    dispatch(setEndCall(true));
  };
  const handleMute = () => {
    setMute(!mute);
  };
  const handleVideoOff = () => {
    setVideoOff(!videoOff);
  };
  return (
    <div className="flex flex-row items-center gap-2">
      <button
        type="button"
        className=" bg-black rounded-full p-3 h-fit w-fit"
        onClick={handleMute}
      >
        {mute ? (
          <KeyboardVoiceIcon sx={{ color: "white", fontSize: "24px" }} />
        ) : (
          <MicOffIcon sx={{ color: "white", fontSize: "24px" }} />
        )}
      </button>
      <button
        type="button"
        className=" bg-red-500 rounded-full p-3"
        onClick={handleEndCall}
      >
        <PhoneDisabledIcon sx={{ color: "white", fontSize: "35px" }} />
      </button>
      <button
        type="button"
        className=" bg-black rounded-full p-3 h-fit w-fit"
        onClick={handleVideoOff}
      >
        {videoOff ? (
          <VideocamIcon sx={{ color: "white", fontSize: "24px" }} />
        ) : (
          <VideocamOffIcon sx={{ color: "white", fontSize: "24px" }} />
        )}
      </button>
    </div>
  );
};

VideoCallmenu.propTypes = {};

export default VideoCallmenu;
