"use client";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setIndraw } from "@/app/store/slice";
import { SocketContext } from "@/app/socket/socketContext";
import { useSession } from "next-auth/react";
import Notify from "./Notify";

const DrawerItem = () => {
  const ws = useContext(SocketContext);
  const session = useSession();
  const UserId = session.data?.data.user.id;
  const draw = useSelector((state: RootState) => state.appAction.draw);
  const initListNotify = useSelector(
    (state: RootState) => state.listNotify.value
  );
  const [listNotify, setListNotify] = useState<any[] | null>(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIndraw());
  };

  const handleDeleteNotify = (notifyId: string) => {
    setListNotify(
      (prevList) =>
        prevList?.filter((notify) => {
          return notify.id !== parseInt(notifyId);
        }) || null
    );
  };

  useEffect(() => {
    setListNotify(initListNotify);
  }, [initListNotify]);

  useEffect(() => {
    if (!ws || !UserId) {
      console.log("Socket or session not available");
      return;
    }
    const handleNewNotify = (newNotify: any) => {
      setListNotify([...(listNotify || []), newNotify.content]);
    };
    ws.on("newNotify", handleNewNotify);
    return () => {
      ws.off("newNotify", handleNewNotify);
    };
  }, [ws, UserId, listNotify]);

  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation">
      <div className="p-3">
        <p className=" text-heading4-bold">Notification</p>
      </div>
      <List>
        {listNotify?.map((notify) => (
          <ListItem key={notify.id} disablePadding className="px-2">
            <Notify
              isRead={notify.isRead}
              notifyid={notify.id.toString()}
              notifyContent={notify.notiContent}
              notifyType={notify.notifyTypeId}
              fromUser={notify.Users_Notifies_fromUserIdToUsers}
              onDelete={handleDeleteNotify}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"right"} open={draw} onClose={handleClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

DrawerItem.propTypes = {};

export default DrawerItem;
