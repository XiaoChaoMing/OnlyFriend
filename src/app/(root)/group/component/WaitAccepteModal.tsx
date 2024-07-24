"use client";
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GET_method, POST_method } from "@/app/utils/fetchApi";
import Card from "./../../../../../components/layout/Card";

interface WaitAcceptProps {
  handleOpen: () => void;
  isOpen: boolean;
  groupId: string;
}

const WaitAccepteModal: React.FC<WaitAcceptProps> = ({
  handleOpen,
  isOpen,
  groupId,
}) => {
  const [waitLists, setWaitList] = useState<any[]>([]);

  const onCloseWaitList = () => {
    handleOpen();
  };

  const handleLoadWaitList = useCallback(async () => {
    const waitList = await GET_method(
      `/group/unaccept-list?group_id=${groupId}`
    );
    setWaitList(waitList.data);
  }, [groupId]);

  const hadleAcceptUser = async (userId: string) => {
    await POST_method(
      {},
      `/group/accept-member?uid=${userId}&group_id=${groupId}`
    );
  };
  useEffect(() => {
    if (isOpen) {
      handleLoadWaitList();
    }
  }, [isOpen, handleLoadWaitList]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onCloseWaitList}
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
          <div className="flex justify-end">
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={onCloseWaitList}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {waitLists.map((users) => {
              const fullName = users.user.firstName + " " + users.user.lastName;
              return (
                <div
                  key={users.id}
                  className="flex flex-row gap-3 items-center"
                >
                  <Card
                    className="flex-grow hover:bg-transparent"
                    width={40}
                    height={40}
                    avartar={users.user.Avatar}
                    friendName={fullName}
                  />
                  <button
                    className=" rounded-md hover:bg-slate-200 text-[16px] font-medium h-fit p-2"
                    onClick={() => {
                      hadleAcceptUser(users.user.id);
                    }}
                  >
                    accept user
                  </button>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

WaitAccepteModal.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default WaitAccepteModal;
