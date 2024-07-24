"use client";
import React, { useCallback, useEffect } from "react";
import MainContainer from "../../../../components/layout/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { GET_method } from "@/app/utils/fetchApi";
import { loadListNotify, updatePostList } from "@/app/store/slice";
import CallModal from "../../../../components/layout/CallModal";
import { useSession } from "next-auth/react";

const FeedPage = () => {
  const session = useSession();
  const uid = session.data?.data.user?.id;
  const dispatch = useDispatch();
  const call = useSelector((state: RootState) => state.videoCall.callTo);
  const showModal = useSelector((state: RootState) => state.appAction.crPost);
  const fetchData = useCallback(async () => {
    const innitial = await GET_method(
      `/post/getAllPosts?pagesize=3&skip=0&type=2&uid=${uid}`
    );
    const NotifyList = await GET_method(`/notify/getAllNotify?uuid=${uid}`);
    dispatch(loadListNotify(NotifyList.data));
    dispatch(updatePostList({ Posts: innitial.data }));
  }, [dispatch, uid]);
  useEffect(() => {
    fetchData();
  }, [showModal, fetchData, call]);
  useEffect(() => {});
  return (
    <div>
      <MainContainer></MainContainer>
      {call && <CallModal />}
    </div>
  );
};

FeedPage.propTypes = {};

export default FeedPage;
