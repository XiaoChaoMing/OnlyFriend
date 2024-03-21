"use client";
import React from "react";
import Image from "next/image";
import Menu from "./Menu";
import { topMaintMenu } from "./../../constants/index";
import { createPostMenu } from "./../../constants/index";
// mui modal
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
const Topmaint = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className=" flex flex-col gap-2 px-8 py-4 bg-white w-full h-fit rounded-xl mb-2">
      {/* create post modal */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
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
              Create post
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={handleClose}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="What do you think ?"
            multiline
            rows={4}
          />

          <Menu
            className="flex flex-row border rounded-lg justify-between"
            listItem={createPostMenu}
          />
          <Button sx={{ backgroundColor: "50C4ED" }} variant="contained">
            Post now
          </Button>
        </Box>
      </Modal>
      <div className="flex flex-row gap-2 mt-2">
        <Image
          src={`/avatar.jpg`}
          width={50}
          height={50}
          alt="Picture of the author"
          className="rounded-full"
        />
        <input
          onClick={handleOpen}
          className=" bg-slate-300 rounded-3xl px-5 w-[85%]"
          type="text"
          placeholder="write your status"
        />
      </div>
      <p className=" h-[2px] rounded-full w-[100%] bg-slate-300 my-3"></p>
      <div>
        <Menu
          className=" flex flex-row justify-between"
          listItem={topMaintMenu}
        />
      </div>
    </div>
  );
};

export default Topmaint;
