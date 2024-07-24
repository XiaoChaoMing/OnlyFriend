"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { loadInitialFriend, setShow } from "@/app/store/slice";
import { GET_method, POST_method } from "@/app/utils/fetchApi";
import { SessionContext } from "next-auth/react";
import { User } from "../../type";
import { RootState } from "@/app/store/store";

const RightSideBar = () => {
  const session = useContext(SessionContext);
  const ListFriend = useSelector((state: RootState) => state.friend.value);
  const [friends, setFriends] = useState<User[] | null>(null);
  const [rcmUser, setRcmUser] = useState<User[] | null>(null);
  const dispatch = useDispatch();

  const openBoxChat = () => {
    dispatch(setShow());
  };

  const fetchData = useCallback(async () => {
    const initialFriends = await GET_method(
      `/follower/getFollower?userId=${session?.data?.data.user.id}`
    );
    const initialRecommend = await GET_method(
      `/users/rcmt-User?uid=${session?.data?.data.user.id}`
    );
    setRcmUser(initialRecommend.data);
    setFriends(initialFriends.data);
    dispatch(loadInitialFriend(initialFriends.data));
  }, [dispatch, session?.data?.data.user.id]);

  const followUser = async (friendId: number) => {
    await POST_method(
      {},
      `/follower/follow?uid=${session?.data?.data.user.id}&followerId=${friendId}`
    );
    fetchData();
  };
  const unfollowUser = async (friendId: number) => {
    await POST_method(
      {},
      `/follower/un-follow?uid=${session?.data?.data.user.id}&followerId=${friendId}`
    );
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="h-screen flex flex-col flex-1 gap-3 flex-2 bg-white px-8 py-4 rounded-tl-xl overflow-auto">
      <p className="text-lg font-bold">Recommend User</p>
      <div className="flex flex-col gap-3">
        {rcmUser
          ? rcmUser.map((friend) => {
              if (friend.id !== session?.data?.data.user.id) {
                return (
                  <div
                    className="flex flex-row justify-between items-center hover:bg-slate-200 rounded-md px-2"
                    key={friend.id}
                  >
                    <Card
                      height={40}
                      width={40}
                      avartar={friend.Avatar}
                      className="flex flex-row items-center gap-3 hover:bg-transparent"
                      friendName={friend.firstName + " " + friend.lastName}
                      eventHandler={openBoxChat}
                    />
                    <button
                      onClick={async () => {
                        await followUser(friend.id);
                      }}
                      className="h-fit p-2 rounded-md hover:bg-slate-500"
                    >
                      Follow
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })
          : ""}
      </div>
      <p className="text-lg font-bold">List Friends</p>
      <div className="flex flex-col gap-3">
        {friends
          ? friends.map((friend) => {
              return (
                <div
                  className="flex flex-row justify-between items-center hover:bg-slate-200 rounded-md px-2"
                  key={friend.Users_Followers_followingIdToUsers.id}
                >
                  <Card
                    height={40}
                    width={40}
                    avartar={friend.Users_Followers_followingIdToUsers.Avatar}
                    className="flex flex-row items-center gap-3 hover:bg-transparent"
                    friendName={
                      friend.Users_Followers_followingIdToUsers.firstName +
                      " " +
                      friend.Users_Followers_followingIdToUsers.lastName
                    }
                    eventHandler={openBoxChat}
                  />
                  <button
                    onClick={async () => {
                      await unfollowUser(
                        friend.Users_Followers_followingIdToUsers.id
                      );
                    }}
                    className="h-fit p-2 rounded-md hover:bg-slate-500"
                  >
                    Unfollow
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default RightSideBar;
