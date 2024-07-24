import { IconProps } from "@mui/material";
import Image from "next/image";
import {
  Home,
  AddPhotoAlternateOutlined,
  GroupOutlined,
  BookmarksOutlined,
  FavoriteBorder,
  ContactPageRoundedIcon,
} from "@mui/icons-material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import ErrorIcon from "@mui/icons-material/Error";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";

// message

import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";

export const sidebarLinks = [
  {
    id: 1,
    icon: <Home sx={{ color: "#008DDA", fontSize: "26px" }} />,
    route: "/feed",
    label: "Home",
  },
  {
    id: 2,
    icon: <AppShortcutIcon sx={{ color: "#9BCF53", fontSize: "26px" }} />,
    route: "/story",
    label: "Story",
  },
  {
    id: 3,
    icon: <GroupOutlined sx={{ color: "#FAA300", fontSize: "26px" }} />,
    route: "",
    label: "Group",
  },
  {
    id: 4,
    icon: <BookmarksOutlined sx={{ color: "#6420AA", fontSize: "26px" }} />,
    route: "/shared",
    label: "Share",
  },
  {
    id: 5,
    icon: <FavoriteBorder sx={{ color: "#EF4040", fontSize: "26px" }} />,
    route: "/liked-posts",
    label: "Liked Posts",
  },
  {
    id: 6,
    icon: <ContactPageIcon sx={{ color: "#41C9E2", fontSize: "26px" }} />,
    route: "/pages",
    label: "Pages",
  },
];

export const groupList = [
  {
    id: 1,
    icon: (
      <Image
        src={`/hinh-anh-co-gai-cute-anime.jpeg`}
        width={35}
        height={35}
        style={{ objectFit: "object-cover" }}
        alt="Picture of the author"
        className=" rounded-full"
      />
    ),
    route: "/group1",
    label: "group hoc tap",
  },
];
export const pageTitles = [
  {
    id: 1,
    url: "/",
    title: "Feed",
  },
  {
    id: 2,
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    id: 3,
    url: "/create-post",
    title: "Create Post",
  },
  {
    id: 4,
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    id: 5,
    url: "/search",
    title: "Search",
  },
  {
    id: 6,
    url: "/search",
    title: "Search",
  },
  {
    id: 7,
    url: "/saved-posts",
    title: "Saved Posts",
  },
  {
    id: 8,
    url: "/liked-posts",
    title: "Liked Posts",
  },
];

export const tabs = [
  {
    id: 1,
    link: "posts",
    name: "Posts",
  },
  {
    id: 2,
    link: "followers",
    name: "Followers",
  },
  {
    id: 3,
    link: "following",
    name: "Following",
  },
];

export const topMaintMenu = [
  {
    id: 1,
    icon: <VideoCameraFrontIcon sx={{ color: "#008DDA", fontSize: "26px" }} />,
    route: "",
    label: "Go Live",
    type: "button",
  },
  {
    id: 2,
    icon: <AddPhotoAlternateIcon sx={{ color: "#9BCF53", fontSize: "26px" }} />,
    route: "",
    label: "Photo",
    type: "button",
  },
  {
    id: 3,
    icon: <OndemandVideoIcon sx={{ color: "#FAA300", fontSize: "26px" }} />,
    route: "",
    label: "Video",
    type: "button",
  },
  {
    id: 4,
    icon: <TagFacesIcon sx={{ color: "#6420AA", fontSize: "26px" }} />,
    route: "",
    label: "Feeling",
    type: "button",
  },
];
export const createPostMenu = [
  {
    id: 1,
    icon: <AddPhotoAlternateIcon sx={{ color: "#9BCF53", fontSize: "26px" }} />,
    route: "",
    label: "Photo",
    type: "input",
  },
  {
    id: 3,
    icon: <TagFacesIcon sx={{ color: "#6420AA", fontSize: "26px" }} />,
    route: "",
    label: "Feeling",
    type: "button",
  },
];
export const messageMenu = [
  {
    id: 1,
    icon: <HomeIcon sx={{ fontSize: "26px", color: "grey" }} />,
    route: "/",
    label: "Home1",
    type: "button",
  },
  {
    id: 2,
    icon: <OndemandVideoIcon sx={{ fontSize: "26px", color: "grey" }} />,
    route: "",
    label: "Home2",
    type: "button",
  },
  {
    id: 3,
    icon: <GroupsIcon sx={{ fontSize: "26px", color: "grey" }} />,
    route: "",
    label: "Home3",
    type: "button",
  },
];
export const chatMenu = [
  {
    id: 1,
    icon: <LocalPhoneIcon sx={{ fontSize: "26px", color: "#10439F" }} />,
    route: "",
    type: "button",
  },
  {
    id: 2,
    icon: <VideoCameraBackIcon sx={{ fontSize: "26px", color: "#10439F" }} />,
    route: "",
    type: "button",
  },
  {
    id: 3,
    icon: <ErrorIcon sx={{ fontSize: "26px", color: "#10439F" }} />,
    route: "",
    type: "button",
  },
];
export const chatItem = [
  {
    id: 1,
    icon: <AddCircleIcon sx={{ fontSize: "26px", color: "#10439F" }} />,
    route: "",
    type: "button",
  },
  {
    id: 2,
    icon: <PermMediaIcon sx={{ fontSize: "26px", color: "#10439F" }} />,
    route: "",
    type: "button",
  },
  {
    id: 3,
    icon: <EmojiEmotionsIcon sx={{ fontSize: "26px", color: "#10439F" }} />,
    route: "",
    type: "button",
  },
];
export const listMessBox = [
  {
    id: 1,
    icon: <LocalPhoneIcon sx={{ fontSize: "20px", color: "white" }} />,
    route: "",
    type: "button",
  },
  {
    id: 2,
    icon: <VideoCameraBackIcon sx={{ fontSize: "20px", color: "white" }} />,
    route: "",
    type: "button",
  },
  {
    id: 3,
    icon: <RemoveIcon sx={{ fontSize: "20px", color: "white" }} />,
    route: "",
    type: "button",
  },
  {
    id: 4,
    icon: <ClearIcon sx={{ fontSize: "20px", color: "white" }} />,
    route: "",
    type: "button",
  },
];
// export const VideoCallmenu = [
//   {
//     id: 1,
//     icon: <PhoneDisabledIcon sx={{ fontSize: "20px", color: "white" }} />,
//     route: "",
//     type: "button",
//   },
//   {
//     id: 2,
//     icon: <KeyboardVoiceIcon sx={{ fontSize: "20px", color: "white" }} />,
//     route: "",
//     type: "button",
//   },
//   {
//     id: 3,
//     icon: <VideocamIcon sx={{ fontSize: "20px", color: "white" }} />,
//     route: "",
//     type: "button",
//   },
// ];
export const listBackground = [
  {
    id: 1,
    bg: "bg-red-400",
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  },
  {
    id: 4,
    bg: "bg-gradient-to-r from-black via-gray-800 to-gray-600",
  },
  {
    id: 5,
    bg: "bg-gradient-to-r from-green-800 via-teal-600 to-teal-400 ",
  },
  {
    id: 6,
    bg: "bg-gradient-to-r from-orange-600 via-yellow-500 to-yellow-300",
  },
  {
    id: 7,
    bg: "bg-gradient-to-r from-teal-700 via-teal-500 to-blue-400 ",
  },
  {
    id: 8,
    bg: "bg-gradient-to-r from-orange-700 via-red-600 to-red-500 ",
  },
  {
    id: 9,
    bg: "bg-gradient-to-r from-red-600 via-pink-600 to-pink-400 ",
  },
  {
    id: 10,
    bg: "bg-gradient-to-r from-rose-500 via-rose-400 to-coral-300 ",
  },
];
