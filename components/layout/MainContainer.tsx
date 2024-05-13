import React, { ReactNode } from "react";
import Topmaint from "./Topmaint";
import Post from "./Post";
interface MainContainerProps {
  children: ReactNode;
}
const MainContainer = () => {
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
      image: ["/fn_test.mp4", "/18268e4b-b2d1-41cb-9a44-25604bb7d8b7.jpg"],
    },
  ];
  return (
    <div className=" flex flex-col gap-3 h-[86vh] min-w-[1200px] px-60 mx-2 overflow-auto ">
      <Topmaint />
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          return <Post key={post.id} value={post} />;
        })}
      </div>
    </div>
  );
};

export default MainContainer;
