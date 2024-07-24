"use client";
import React, { useEffect } from "react";
import TopBar from "../component/TopBar";
import MessagePage from "./../component/MessagePage";
import FriendProfile from "./../component/FriendProfile";
import ChatList from "./../component/ChatList";
import CallModal from "../../../../../components/layout/CallModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { GET_method } from "@/app/utils/fetchApi";
import { useSession } from "next-auth/react";
import { getLocalStorageItem, setLocalStorageItem } from "@/app/utils";
import { loadListFriend, loadMsg, curFriend } from "@/app/store/slice";

const Messagepage = () => {
  const call = useSelector((state: RootState) => state.videoCall.callTo);
  const friend = useSelector((state: RootState) => state.listFriend.friend);
  const session = useSession();
  const uid = session.data?.data.user?.id;
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    if (uid) {
      try {
        const initialFriends = await GET_method(
          `/follower/getFollower?userId=${uid}`
        );
        dispatch(loadListFriend(initialFriends.data));
        if (initialFriends.data.length > 0) {
          const firstFriend = initialFriends.data[0];
          dispatch(curFriend(firstFriend));
          setLocalStorageItem("curFriend", firstFriend);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    }
  };

  const fetchDataMsg = async (userId: string, friendId: string) => {
    try {
      const dataList = await GET_method(
        `/msg/GetBoxChat?uid=${userId}&friendId=${friendId}`
      );
      dispatch(loadMsg(dataList.data));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [uid]);

  useEffect(() => {
    if (uid && friend?.Users_Followers_followingIdToUsers?.id) {
      fetchDataMsg(
        uid.toString(),
        friend.Users_Followers_followingIdToUsers.id.toString()
      );
    }
  }, [friend, call]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-row h-screen">
        <ChatList />
        <MessagePage />
        <FriendProfile />
      </div>
      {call && <CallModal />}
    </div>
  );
};

export default Messagepage;
