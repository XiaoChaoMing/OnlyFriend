"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { GET_method, POST_method } from "@/app/utils/fetchApi";
import { SessionContext } from "next-auth/react";
import router, { useRouter } from "next/router";
import Link from "next/link";
// interface ListRecommentProps {
//   groupImage: string;
//   groupName: string;
//   _count: any;
// }
const ListRecomment = () => {
  const session = useContext(SessionContext);
  const userId = session?.data?.data.user.id;
  const [listRecomment, setListRecomment] = useState<any[] | null>(null);
  const fetchData = useCallback(async () => {
    const listRecomment = await GET_method(
      `/group/recomment-group?uid=${userId}`
    );
    console.log(listRecomment.data);
    setListRecomment(listRecomment.data);
  }, [userId]);
  const handleJointGroup = async (groupId: string) => {
    await POST_method(
      {},
      `/group/join-group?uid=${userId}&group_id=${groupId}`
    );
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      {listRecomment?.map((group) => {
        return (
          <div
            key={group.id}
            className="flex flex-row gap-3 items-center bg-white rounded-md p-4 mx-10 cursor-pointer relative"
          >
            <Link
              className="flex flex-row gap-3 items-center w-full"
              href={`/group/${group.id}`}
            >
              <div className="h-[100px] w-[100px] overflow-hidden relative">
                <Image
                  src={group.groupImage}
                  layout="fill"
                  objectFit="cover"
                  alt="db"
                />
              </div>
              <div className="flex flex-col gap-2 -center">
                <p>{group._count.groupmember} members</p>
                <p>{group.groupName}</p>
              </div>
              <div className="flex-1 text-end  ">
                <button
                  className="bg-blue-400 rounded-md p-3 text-white"
                  type="button"
                  onClick={() => {
                    handleJointGroup(group.id);
                  }}
                >
                  Joint group
                </button>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

ListRecomment.propTypes = {};

export default ListRecomment;
