import React from "react";
import PropTypes from "prop-types";
import Card from "../../../../../components/layout/Card";
import { getLocalStorageItem } from "@/app/utils";

const FriendProfile = () => {
  const localData = getLocalStorageItem("curFriend") as any;
  const friend = localData;
  return (
    <div className="flex-2 w-[400px]">
      <Card
        avartar={friend.Users_Followers_followingIdToUsers.Avatar}
        friendName={
          friend.Users_Followers_followingIdToUsers.firstName +
          "" +
          friend.Users_Followers_followingIdToUsers.lastName
        }
        height={100}
        width={100}
        className="flex flex-col justify-center items-center hover:bg-transparent"
      />
    </div>
  );
};

FriendProfile.propTypes = {};

export default FriendProfile;
