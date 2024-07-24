import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { GET_method } from "@/app/utils/fetchApi";
import { Backend_url } from "./../../src/app/lib/Constant";
import { User } from "../../type";
import SearchList from "./SearchList";

interface SearchModalProps {
  handleShow: () => void;
  show: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ handleShow, show }) => {
  const [showMD, setShowMD] = useState(show);
  const [users, setUser] = useState<User[] | null>(null);
  const findUser = async (name: string) => {
    const user = await GET_method(`/users/findUserByname?Name=${name}`);
    console.log(user.data);
    setUser(user.data);
  };
  useEffect(() => {
    setShowMD(show);
  }, [show]);

  const handleClose = () => {
    setShowMD(!showMD);
    handleShow();
  };

  return (
    <div>
      <Modal
        open={showMD}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row items-center">
            <Typography
              className="flex-1 text-center"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Find everything you want !
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={handleClose}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <div className="rounded-3xl flex flex-row bg-gray-200 gap-3 p-3">
            <SearchIcon sx={{ color: "#124076", fontSize: "30px" }} />
            <input
              onChange={(e) => findUser(e.target.value)}
              className="outline-none border-none w-[85%] bg-transparent"
              type="text"
              placeholder="search whatever you want!"
            />
          </div>
          <div>
            <SearchList users={users} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

SearchModal.propTypes = {};

export default SearchModal;
