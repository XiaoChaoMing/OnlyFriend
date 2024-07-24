"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import { groupList } from "./../../constants/index";
import { sidebarLinks } from "./../../constants/index";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Modal,
  Typography,
  Button,
  Menu as MuiMenu,
  MenuItem,
} from "@mui/material";
import { SessionContext } from "next-auth/react";
import ListRecomment from "@/app/(root)/component/ListRecomment";
import CreateGroup from "./CreateGroup";
import { GET_method } from "@/app/utils/fetchApi";
import Image from "next/image";
import Link from "next/link";

const LeftSideBar = () => {
  const [show, setShow] = useState<boolean>(false);
  const [listGroup, setListGroup] = useState<any[] | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOption, setMenuOption] = useState<string>("recommended");
  const session = useContext(SessionContext);
  const userId = session?.data?.data.user.id;
  const handleBoxChat = (id: number | null | undefined) => {
    if (id === 3) {
      setShow(true);
    } else {
      console.log("test");
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (option: string) => {
    setAnchorEl(null);
    setMenuOption(option);
  };
  const fetchData = useCallback(async () => {
    const listRecomment = await GET_method(
      `/group/jointed-group?uid=${userId}`
    );
    setListGroup(listRecomment.data);
  }, [userId]);
  const renderContent = () => {
    if (menuOption === "recommended") {
      return <ListRecomment />;
    } else if (menuOption === "create") {
      return <CreateGroup userId={userId} />;
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar bg-white rounded-tr-xl rounded-br-xl">
      <Menu listItem={sidebarLinks} handleEvent={handleBoxChat} />
      <p className="text-xs font-bold text-gray-800">My Groups</p>
      <div className="flex flex-col gap-3">
        {listGroup?.map((group) => {
          return (
            <div key={group.id}>
              <Link
                className="flex flex-row gap-2 items-center"
                href={`/group/${group.id}`}
              >
                <Box>
                  <Box
                    className="rounded-full overflow-hidden"
                    position="relative"
                    width="40px"
                    height="40px"
                  >
                    <Image
                      src={group.groupImage}
                      alt="Group Image Preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                </Box>
                <p>{group.groupName}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <Modal
        open={show}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            height: "60%",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          <div className="flex flex-row items-center sticky">
            <Typography
              className="flex-1 text-center "
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Explore Groups
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={() => {
                setShow(false);
              }}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>

          <div className="flex justify-start mb-4">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              variant="contained"
              color="primary"
            >
              Menu
            </Button>
            <MuiMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose(menuOption)}
            >
              <MenuItem onClick={() => handleMenuClose("recommended")}>
                Xem các nhóm được đề xuất
              </MenuItem>
              <MenuItem onClick={() => handleMenuClose("create")}>
                Tạo nhóm mới
              </MenuItem>
            </MuiMenu>
          </div>

          <div>{renderContent()}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default LeftSideBar;
