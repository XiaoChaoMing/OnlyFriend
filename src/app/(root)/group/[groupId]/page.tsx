"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import { Posts } from "../../../../../type";
import { GET_method } from "@/app/utils/fetchApi";
import Header from "../../component/Header";
import CardPersonal from "../../../../../components/layout/CardPersonal";
import PersonalImg from "../../../../../components/layout/PersonalImg";
import Topmaint from "../../../../../components/layout/Topmaint";
import Post from "../../../../../components/layout/Post";
import { Menu, MenuItem, IconButton, Typography, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchData } from "next-auth/client/_utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import WaitAccepteModal from "../component/WaitAccepteModal";

interface Member {
  id: string;
}

interface Admin {
  id: string;
}

const Page = ({ params }: { params: { groupId: string } }) => {
  const session = useSession();
  const uid = session.data?.data.user?.id;
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [post, setPost] = useState<Posts[] | []>([]);
  const [showWaitList, setShowWaitList] = useState(false);
  const [GroupHeader, setHeader] = useState<any | null>(null);
  const [memberList, setMemberList] = useState<Member[] | null>(null);
  const [waitAcceptUserList, setWaitAcceptUserList] = useState<any[] | []>([]);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.appAction.crPost);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [groupImage, setGroupImage] = useState<any[] | []>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShowWaitList = () => {
    setShowWaitList(false);
    fetchListMemberJoin();
  };
  const handleMenuAdmin = () => {
    setShowWaitList(true);
    setAnchorEl(null);
    fetchListMemberJoin();
  };
  const loadHeaderGroup = async () => {
    const header = await GET_method(
      `/group/load-Group?group_id=${params.groupId}`
    );
    if (header.data) {
      setHeader(header.data);
    }
  };
  const loadMorePost = async () => {
    const next = page + 3;
    const newPost = await GET_method(
      `/post/get-group-post?pagesize=3&skip=${next}&groupId=${params.groupId}`
    );
    if (newPost.data?.length) {
      setPage(next);
      setPost([...(post || []), ...newPost.data]);
    }
  };
  const fetchGroupPostData = async () => {
    const posts = await GET_method(
      `/post/get-group-post?pagesize=3&skip=${page}&groupId=${params.groupId}&uid=${uid}`
    );
    return setPost(posts.data);
  };
  const fetchPostImages = async () => {
    const mediaPosts = await GET_method(
      `/post/get-group-img?groupId=${params.groupId}`
    );
    setGroupImage(mediaPosts.data);
  };
  const fetchGroupMember = async () => {
    const member = await GET_method(
      `/group/load-member?group_id=${params.groupId}`
    );
    if (member.data) {
      setMemberList(member.data);
      setIsMember(member.data.some((member: any) => member.user.id === uid));
    }
  };
  const fetchGroupAdmin = async () => {
    const admin = await GET_method(
      `/group/load-admin?group_id=${params.groupId}`
    );
    if (admin.data) {
      setIsAdmin(admin.data.some((admin: any) => admin.userId === uid));
    }
  };
  const fetchListMemberJoin = async () => {
    const listUser = await GET_method(
      `/group/unaccept-list?group_id=${params.groupId}`
    );
    setWaitAcceptUserList(listUser.data);
  };
  useEffect(() => {
    fetchGroupPostData();
    loadHeaderGroup();
    fetchGroupMember();
    fetchGroupAdmin();
    fetchPostImages();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMorePost();
    }
  }, [inView]);
  useEffect(() => {
    fetchGroupPostData();
  }, [showModal, dispatch]);

  return (
    <div className="flex flex-col gap-3 h-[86vh] min-w-[1200px] px-3 mx-2 overflow-x-hidden">
      <div className="h-fit ">
        <Header isAdmin={isAdmin} groupId={params.groupId} {...GroupHeader} />
      </div>
      <div className="flex flex-row gap-3 ">
        <div className="min-w-[500px] flex flex-col gap-3 relative">
          <PersonalImg posts={groupImage} />
        </div>
        {isMember ? (
          <div className="flex flex-col gap-3 w-full">
            {isAdmin && (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Menu
                </Button>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuAdmin}
                >
                  <MenuItem onClick={handleMenuAdmin}>
                    Manage Unacepted Members
                  </MenuItem>
                  <MenuItem onClick={() => {}}>Manage Members</MenuItem>
                </Menu>
              </div>
            )}
            <Topmaint groupId={params.groupId} />
            {post?.map((item) => (
              <Post key={item.id} value={item} />
            ))}

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
          </div>
        ) : (
          <div>You are not a member of this group.</div>
        )}
      </div>
      <WaitAccepteModal
        groupId={params.groupId}
        handleOpen={handleShowWaitList}
        isOpen={showWaitList}
      />
    </div>
  );
};

Page.propTypes = {};

export default Page;
