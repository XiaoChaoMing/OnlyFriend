import React, { useRef } from "react";
import PropTypes from "prop-types";
import Header from "../component/Header";
import Post from "../../../../components/layout/Post";
import CardPersonal from "../../../../components/layout/CardPersonal";
import PersonalImg from "../../../../components/layout/PersonalImg";
import Topmaint from "../../../../components/layout/Topmaint";
const Page = () => {
  const posts = [
    {
      id: 1,
      avatar: "/avatar.jpg",
      username: "minh nguyen",
      status: "test1",
      image: [
        "/434596798_271021136057197_4712311117639856009_n.jpg",
        "/18268e4b-b2d1-41cb-9a44-25604bb7d8b7.jpg",
      ],
    },
    {
      id: 2,
      avatar: "/avatar.jpg",
      username: "xcm149",
      status: "test2",
      image: [
        "/hinh-anh-co-gai-cute-anime.jpeg",
        "/18268e4b-b2d1-41cb-9a44-25604bb7d8b7.jpg",
      ],
    },
  ];
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
        <div className="flex flex-col gap-3">
          <Topmaint />
          {posts.map((post) => (
            <Post key={post.id} value={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

Page.propTypes = {};

export default Page;
