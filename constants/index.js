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
import React from "react";

export const sidebarLinks = [
  {
    icon: <Home sx={{ color: "#008DDA", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: (
      <AddPhotoAlternateOutlined sx={{ color: "#9BCF53", fontSize: "26px" }} />
    ),
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <GroupOutlined sx={{ color: "#FAA300", fontSize: "26px" }} />,
    route: "/group",
    label: "Group",
  },
  {
    icon: <BookmarksOutlined sx={{ color: "#6420AA", fontSize: "26px" }} />,
    route: "/share-bookmarks",
    label: "Share",
  },
  {
    icon: <FavoriteBorder sx={{ color: "#EF4040", fontSize: "26px" }} />,
    route: "/liked-posts",
    label: "Liked Posts",
  },
  {
    icon: <ContactPageIcon sx={{ color: "#41C9E2", fontSize: "26px" }} />,
    route: "/pages",
    label: "Pages",
  },
];

export const groupList = [
  {
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
    label: "groupsex",
  },
];
export const pageTitles = [
  {
    url: "/",
    title: "Feed",
  },
  {
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    url: "/create-post",
    title: "Create Post",
  },
  {
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    url: "/search",
    title: "Search",
  },
  {
    url: "/search",
    title: "Search",
  },
  {
    url: "/saved-posts",
    title: "Saved Posts",
  },
  {
    url: "/liked-posts",
    title: "Liked Posts",
  },
];

export const tabs = [
  {
    link: "posts",
    name: "Posts",
  },
  {
    link: "followers",
    name: "Followers",
  },
  {
    link: "following",
    name: "Following",
  },
];

export const topMaintMenu = [
  {
    icon: <VideoCameraFrontIcon sx={{ color: "#008DDA", fontSize: "26px" }} />,
    route: "",
    label: "Go Live",
  },
  {
    icon: <AddPhotoAlternateIcon sx={{ color: "#9BCF53", fontSize: "26px" }} />,
    route: "",
    label: "Photo",
  },
  {
    icon: <OndemandVideoIcon sx={{ color: "#FAA300", fontSize: "26px" }} />,
    route: "",
    label: "Video",
  },
  {
    icon: <TagFacesIcon sx={{ color: "#6420AA", fontSize: "26px" }} />,
    route: "",
    label: "Feeling",
  },
];
export const createPostMenu = [
  {
    icon: <AddPhotoAlternateIcon sx={{ color: "#9BCF53", fontSize: "26px" }} />,
    route: "",
    label: "Photo",
  },
  {
    icon: <OndemandVideoIcon sx={{ color: "#FAA300", fontSize: "26px" }} />,
    route: "",
    label: "Video",
  },
  {
    icon: <TagFacesIcon sx={{ color: "#6420AA", fontSize: "26px" }} />,
    route: "",
    label: "Feeling",
  },
];
