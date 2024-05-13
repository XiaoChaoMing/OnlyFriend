"use client";
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setDraw, setIndraw } from "@/app/store/slice";
const DrawerItem = () => {
  const draw = useSelector((state: RootState) => state.showDrawer.value);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIndraw());
  };
  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation" onClick={handleClose}>
      <div className="p-3">
        <p className=" text-heading4-bold">Notification</p>
      </div>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
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
