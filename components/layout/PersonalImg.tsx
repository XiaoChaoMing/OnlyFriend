"use client";
import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

interface PersonalImgProps {
  posts: any[] | [];
}
const PersonalImg: React.FC<PersonalImgProps> = ({ posts }) => {
  useEffect(() => {}, [posts]);
  return (
    <div className="bg-white p-3 rounded-md sticky top-0">
      <p className="text-[24px] font-bold pb-3">Image Storage</p>
      <ImageList
        className=""
        sx={{ width: 470, height: 470 }}
        cols={3}
        rowHeight={154}
      >
        {posts.map((post) => (
          <ImageListItem key={post.id} className="overflow-hidden">
            <img
              srcSet={`${post.PostMedia[0].mediaFile}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${post.PostMedia[0].mediaFile}?w=164&h=164&fit=crop&auto=format`}
              alt="not found"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

PersonalImg.propTypes = {};

export default PersonalImg;
