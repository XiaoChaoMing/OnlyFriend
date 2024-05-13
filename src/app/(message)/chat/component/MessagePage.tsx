import React from "react";
import Card from "./../../../../../components/layout/Card";
import Menu from "./../../../../../components/layout/Menu";
import { chatMenu, chatItem } from "./../../../../../constants/index";
import MessageSend from "./MessageSend";
import MessageRecive from "./MessageRecive";
import SendIcon from "@mui/icons-material/Send";
const MessagePage = () => {
  const listMesage = [
    { id: 1, msgText: "test1", fromUserId: 1, toUserId: 2 },
    { id: 2, msgText: "hello2", fromUserId: 2, toUserId: 1 },
    { id: 3, msgText: "test1", fromUserId: 1, toUserId: 2 },
    {
      id: 4,
      msgText:
        "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/166539/Originals/anime-ai-la-gi-bat-mi-cach-tao-anime-bang-ai-cuc-don-gian.png",
      fromUserId: 2,
      toUserId: 1,
    },
    {
      id: 5,
      msgText: "/18268e4b-b2d1-41cb-9a44-25604bb7d8b7.jpg",
      fromUserId: 1,
      toUserId: 2,
    },
  ];
  return (
    <div className="flex flex-col flex-1 sticky top-0">
      <div className="flex flex-row">
        <Card
          height={40}
          width={40}
          className="flex flex-row items-center gap-3"
        />
        <Menu
          className="flex flex-row flex-1 justify-end gap-1"
          listItem={chatMenu}
        />
      </div>
      <div className=" flex flex-col gap-3 h-[75vh] overflow-scroll overflow-x-hidden p-3">
        {listMesage.map((msg) => {
          if (msg.fromUserId === 1) {
            return <MessageSend msgText={msg.msgText} key={msg.id} />;
          } else {
            return <MessageRecive msgText={msg.msgText} key={msg.id} />;
          }
        })}
      </div>
      <div className=" flex flex-row w-full h-14">
        <Menu className="flex flex-row" listItem={chatItem} />
        <div className=" flex flex-row items-center w-full bg-slate-200 rounded-2xl p-3 ">
          <input
            className=" outline-none border-none bg-transparent w-[95%]"
            type="text"
            placeholder="Write something ..."
          />
          <SendIcon sx={{ fontSize: "26px", color: "#10439F" }} />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
