"use client";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Header from "../component/Header";
import Post from "../../../../components/layout/Post";
import CardPersonal from "../../../../components/layout/CardPersonal";
import PersonalImg from "../../../../components/layout/PersonalImg";
import Topmaint from "../../../../components/layout/Topmaint";
import { GET_method } from "@/app/utils/fetchApi";
import { Posts } from "./../../../../type";
import { useInView } from "react-intersection-observer";
const Page = () => {
  const header = {
    maintImage: "/avatar.jpg",
    wallPaper: "https://tiki.vn/blog/wp-content/uploads/2023/08/thumb-22.jpg",
    name: "Group name",
    follower: 100000,
    liked: 190000,
    description: {
      info: "loton1.com",
      email: "minhnguyen@gmail.com",
    },
  };
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [post, setPost] = useState<Posts[] | null>(null);
  const loadMorePost = async () => {
    const next = page + 3;
    const newPost = await GET_method(
      `/post/getAllPosts?pagesize=3&skip=${next}`
    );
    if (newPost.data?.length) {
      setPage(next);
      setPost([...(post || []), ...newPost.data]);
    }
  };
  const fetchGroupPostData = async () => {
    const posts = await GET_method(`/post/getAllPosts?pagesize=3&skip=${page}`);
    return setPost(posts.data);
  };
  useEffect(() => {
    fetchGroupPostData();
  }, []);
  useEffect(() => {
    if (inView) {
      loadMorePost();
    }
  }, [inView]);
  return (
    <div className="flex flex-col gap-3 h-[86vh] min-w-[1200px] px-3 mx-2 overflow-x-hidden">
      <div className="h-fit ">
        <Header {...header} />
      </div>
      <div className="flex flex-row gap-3 ">
        <div className="min-w-[500px] flex flex-col gap-3 relative">
          <CardPersonal
            info={header.description.info}
            email={header.description.email}
          />
          <PersonalImg />
        </div>
        <div ref={ref} className="flex flex-col gap-3">
          <Topmaint />
          {post?.map((item) => (
            <Post key={item.id} value={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

Page.propTypes = {};

export default Page;
