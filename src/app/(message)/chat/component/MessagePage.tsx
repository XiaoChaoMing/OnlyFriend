import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import _, { random } from "lodash";
import { twMerge } from "tailwind-merge";
import { SocketContext } from "@/app/socket/socketContext";
import {
  getDownloadUrl,
  getLocalStorageItem,
  openCenteredWindow,
  setLocalStorageItem,
  uploadSingleImage,
} from "@/app/utils";
import { RootState } from "@/app/store/store";
import { loadMsg } from "@/app/store/slice";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import Card from "./../../../../../components/layout/Card";
import Menu from "./../../../../../components/layout/Menu";
import { chatMenu } from "./../../../../../constants/index";
import MessageSend from "./MessageSend";
import MessageRecive from "./MessageRecive";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import AddImageModal from "./AddImageModal";
import ClearIcon from "@mui/icons-material/Clear";

const MessagePage = () => {
  const initFriend = useSelector((state: RootState) => state.listFriend.friend);
  const [friends, setFriends] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [addImage, setAddImage] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const session = useSession();
  const uid = session.data?.data.user.id;
  const ws = useContext(SocketContext);
  const localData = getLocalStorageItem("curFriend") as any;
  const friendId = localData?.Users_Followers_followingIdToUsers.id;
  const dispatch = useDispatch();
  const listMessage = useSelector((state: RootState) => state.msg.value);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    if (selectedFiles) {
      const dataTransfer = new DataTransfer();
      Array.from(selectedFiles).forEach((file, i) => {
        if (i !== index) dataTransfer.items.add(file);
      });
      setSelectedFiles(
        dataTransfer.files.length > 0 ? dataTransfer.files : null
      );
    }
  };

  const handleBoxChat = (id: number | null | undefined) => {
    if (id === 3) {
      console.log(id);
    } else if (id === 1) {
      console.log(id);
    } else {
      setLocalStorageItem("isCall", true);
      openCenteredWindow("http://localhost:3000/videoCall", "test", 1200, 700);
    }
  };

  const sendMessage = async (content: string) => {
    const msg = {
      id: Math.random(),
      fromUserId: uid,
      messageText: content,
      messMedia: "",
    };
    if (ws) {
      if (selectedFiles) {
        const filePromises = Array.from(selectedFiles).map(async (file) => {
          await uploadSingleImage(file);
          const downloadUrl = await getDownloadUrl(`image/${file.name}`);
          msg.messMedia = downloadUrl;
          return downloadUrl;
        });
        const mediaFiles = await Promise.all(filePromises);
        ws.emit("sendMessage", {
          uid,
          friendId,
          content,
          files: mediaFiles[0],
        });
      } else if (audioUrl) {
        const response = await fetch(audioUrl);
        const audioBlob = await response.blob();
        const date = new Date();
        const curDate = date.toISOString().slice(0, 10);
        let random = self.crypto.randomUUID();
        const audioFile = new File(
          [audioBlob],
          `${curDate}-${random}_audio.wav`,
          {
            type: "audio/wav",
          }
        );
        await uploadSingleImage(audioFile);
        const downloadUrl = await getDownloadUrl(`image/${audioFile.name}`);
        msg.messMedia = downloadUrl;
        ws.emit("sendMessage", { uid, friendId, content, files: downloadUrl });
      } else {
        ws.emit("sendMessage", { uid, friendId, content, files: null });
      }
    }
    dispatch(loadMsg([...(listMessage || []), msg]));
    scrollToBottom();
    setInputValue("");
    setSelectedFiles(null);
    setAudioUrl(null);
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  };

  const closeModal = (state: boolean) => {
    setAddImage(state);
  };

  const debounceMessagePending = useCallback(
    _.debounce(() => {
      if (ws) {
        ws.emit("pendingMessage", { friendId });
      }
    }, 300),
    [ws, friendId]
  );

  useEffect(() => {
    setFriends(initFriend);
  }, [initFriend]);

  useEffect(() => {
    if (!ws) {
      console.log("Socket or session not available");
      return;
    }

    const handleReceiveMessage = (newMsg: any) => {
      const msg = {
        id: Math.random(),
        fromUserId: newMsg.content.uid,
        toUserId: newMsg.content.friendId,
        messageText: newMsg.content.content,
        messMedia: newMsg.content.files,
      };
      setPending(false);
      dispatch(loadMsg([...(listMessage || []), msg]));
      scrollToBottom();
    };

    const handlePendingMessage = () => {
      setPending(true);
      scrollToBottom();
    };

    ws.on("receiveMessage", handleReceiveMessage);
    ws.on("pendingMsg", handlePendingMessage);
    scrollToBottom();
    return () => {
      ws.off("receiveMessage", handleReceiveMessage);
      ws.off("pendingMsg");
    };
  }, [ws, listMessage, friendId, dispatch, pending, addImage, selectedFiles]);

  const handleEmojiClick = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
        setRecording(false);
      };
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col flex-1 sticky top-0">
      <AddImageModal show={addImage} handleCloseMD={closeModal} />
      <div className="flex flex-row">
        {friends && (
          <Card
            height={40}
            width={40}
            avartar={friends.Users_Followers_followingIdToUsers.Avatar}
            friendName={
              friends.Users_Followers_followingIdToUsers.firstName +
              " " +
              friends.Users_Followers_followingIdToUsers.lastName
            }
            className="flex flex-row items-center gap-3"
          />
        )}
        <Menu
          className="flex flex-row flex-1 justify-end gap-1"
          listItem={chatMenu}
          handleEvent={handleBoxChat}
        />
      </div>
      <div
        ref={messageEndRef}
        className="flex flex-col gap-3 h-[78vh] overflow-scroll overflow-x-hidden p-3 relative"
      >
        {listMessage?.map((msg) =>
          msg.fromUserId === uid ? (
            <MessageSend
              msgText={msg.messMedia ? msg.messMedia : msg.messageText}
              key={msg.id}
            />
          ) : (
            <MessageRecive
              msgText={msg.messMedia ? msg.messMedia : msg.messageText}
              key={msg.id}
            />
          )
        )}
        {pending && <p className=" absolute bottom-1 left-1">user is typing</p>}
      </div>
      <div className="flex flex-row w-full h-14 items-end">
        <div className="flex flex-row gap-4 items-center px-3 pb-2">
          <label>
            <PermMediaIcon sx={{ fontSize: "26px", color: "#10439F" }} />
            <input type="file" onInput={handleFileChange} id="" />
          </label>
          <EmojiEmotionsIcon
            sx={{ fontSize: "26px", color: "#10439F" }}
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          />
          {recording ? (
            <StopIcon
              sx={{ fontSize: "26px", color: "#10439F" }}
              onClick={stopRecording}
            />
          ) : (
            <MicIcon
              sx={{ fontSize: "26px", color: "#10439F" }}
              onClick={startRecording}
            />
          )}
        </div>
        <div className="flex flex-col gap-1 h-fit w-full bg-slate-200 rounded-2xl p-3 relative z-50">
          {emojiPickerVisible && (
            <div className="absolute bottom-14">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <div className="flex flex-row gap-2">
            {selectedFiles &&
              Array.from(selectedFiles).map((file, index) => (
                <div key={index} className="relative file-preview">
                  {file.type.startsWith("image") ? (
                    <Image
                      width={70}
                      height={70}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className=" object-cover rounded"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-16 h-16 object-cover rounded"
                      controls
                    />
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 border-[1px] border-[#10439F] text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <ClearIcon sx={{ fontSize: "13px", color: "#10439F" }} />
                  </button>
                </div>
              ))}
          </div>
          <div className="flex flex-row items-center ">
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                debounceMessagePending();
              }}
              className="outline-none border-none bg-transparent w-[95%]"
              type="text"
              placeholder="Write something ..."
            />
            <SendIcon
              onClick={() => sendMessage(inputValue)}
              sx={{ fontSize: "26px", color: "#10439F" }}
            />
          </div>
          {audioUrl && (
            <div className="audio-preview">
              <audio controls src={audioUrl}></audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
