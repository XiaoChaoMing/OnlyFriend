"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Posts } from "../../../../../type";
import { GET_method } from "@/app/utils/fetchApi";
import Header from "../../component/Header";
import PersonalImg from "../../../../../components/layout/PersonalImg";
import Topmaint from "../../../../../components/layout/Topmaint";
import Post from "../../../../../components/layout/Post";
import { useSession } from "next-auth/react";

interface PersonnalPageProps {
  params: {
    userId: string;
  };
}

interface PersonalHeader {
  Avatar?: string;
  firstName?: string;
  lastName?: string;
  Wall?: string;
}

const PersonnalPage: React.FC<PersonnalPageProps> = ({ params }) => {
  const session = useSession();
  const userId = session.data?.data.user.id;
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [post, setPost] = useState<Posts[] | null>(null);
  const [personalHeader, setPersonalHeader] = useState<PersonalHeader | null>(
    null
  );
  const [personalImage, setPersonalImage] = useState<any[]>([]);
  const [stopLoading, setStopLoading] = useState(false);
  const loadHeaderPersonal = async () => {
    const header = await GET_method(`/users/getUserById?uid=${params.userId}`);
    if (header.data) {
      setPersonalHeader(header.data);
    }
  };

  const loadMorePost = async () => {
    const next = page + 3;
    const newPost = await GET_method(
      `/post/get-personal-post?pagesize=3&skip=${next}&type=2&uid=${params.userId}`
    );
    if (newPost.data?.length) {
      setPage(next);
      setPost([...(post || []), ...newPost.data]);
      setStopLoading(true);
    }
  };

  const fetchPersonalPostData = async () => {
    const posts = await GET_method(
      `/post/get-personal-post?pagesize=3&skip=0&type=2&uid=${params.userId}`
    );
    setPost(posts.data);
  };

  const fetchPostImages = async () => {
    const mediaPosts = await GET_method(
      `/post/get-personal-img?uid=${params.userId}`
    );
    setPersonalImage(mediaPosts.data);
  };

  useEffect(() => {
    fetchPersonalPostData();
    loadHeaderPersonal();
    fetchPostImages();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMorePost();
    }
  }, [inView, post]);

  return (
    <div className="flex flex-col gap-3 h-[86vh] min-w-[1200px] px-3 mx-2 overflow-x-hidden">
      <div className="h-fit">
        <Header
          Avatar={personalHeader?.Avatar}
          firstName={personalHeader?.firstName}
          lastName={personalHeader?.lastName}
          Wall={personalHeader?.Wall}
        />
      </div>
      <div className="flex flex-row gap-3">
        <div className="min-w-[500px] flex flex-col gap-3 relative">
          <PersonalImg posts={personalImage} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Topmaint />
          {post?.map((item) => (
            <Post key={item.id} value={item} />
          ))}
          {stopLoading ? (
            <div
              ref={ref}
              role="status"
              className="flex flex-row justify-center"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="w-full flex text-center mt-4 font-semibold text-[20px]">
              No more content to load ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonnalPage;
