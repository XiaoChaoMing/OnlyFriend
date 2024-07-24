"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxVideo from "../component/BoxVideo";
import PostModal from "../../../../components/layout/PostModal";
import { GET_method } from "@/app/utils/fetchApi";
import { setOpent, updatePostList } from "@/app/store/slice";
import { Posts } from "../../../../type";
import { RootState } from "@/app/store/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const StoryPage = () => {
  const [listReels, setListReels] = useState<Posts[] | null>(null);
  const postList = useSelector((state: RootState) => state.postList.value);
  const showModal = useSelector((state: RootState) => state.appAction.crPost);
  const dispatch = useDispatch();

  const handleOpent = () => {
    dispatch(setOpent());
  };

  const fetchData = useCallback(async () => {
    const initial = await GET_method(
      "/post/getAllPosts?pagesize=3&skip=0&type=1"
    );
    dispatch(updatePostList({ Posts: initial.data }));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData,dispatch,showModal]);
  

  return (
    <div className="flex flex-col gap-3 h-[86vh] min-w-[1200px] px-3 mx-2 overflow-x-hidden overflow-scroll snap-y snap-mandatory">
      <button className="fixed bottom-2 right-[400px]" onClick={handleOpent}>
        <AddCircleOutlineIcon
          className="absolute bottom-3 right-5"
          sx={{ fontSize: "50px" }}
        />
      </button>
      {postList?.Posts?.map((reel) => (
        <BoxVideo value={reel} key={reel.id} />
      ))}
      <PostModal postType={1} />
    </div>
  );
};

export default StoryPage;
