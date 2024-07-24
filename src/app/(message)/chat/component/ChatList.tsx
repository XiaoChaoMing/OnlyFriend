"use client";
import React, { useEffect, useState } from "react";
import Card from "./../../../../../components/layout/Card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { curFriend } from "@/app/store/slice";
import { setLocalStorageItem } from "@/app/utils";

const ChatList = () => {
  const dispatch = useDispatch();
  const listFriend = useSelector((state: RootState) => state.listFriend.value);
  const [friends, setFriends] = useState<any[] | null>(null);

  useEffect(() => {
    setFriends(listFriend);
  }, [listFriend]);

  const handleSelectFriend = (friend: any) => {
    dispatch(curFriend(friend));
    setLocalStorageItem("curFriend", friend);
  };

  return (
    <div className="h-screen w-[400px] left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-3 max-md:hidden custom-scrollbar bg-white rounded-tr-xl rounded-br-xl border-r">
      {friends?.map((friend) => (
        <Card
          eventHandler={() => handleSelectFriend(friend)}
          key={friend.id}
          height={40}
          width={40}
          avartar={friend.Users_Followers_followingIdToUsers.Avatar}
          friendName={`${friend.Users_Followers_followingIdToUsers.firstName} ${friend.Users_Followers_followingIdToUsers.lastName}`}
          className="flex flex-row items-center gap-3"
        />
      ))}
    </div>
  );
};

export default ChatList;
