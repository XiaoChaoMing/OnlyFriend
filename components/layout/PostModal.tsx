import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPostMenu } from "./../../constants/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { ListImages } from "./../../type";
import Image from "next/image";
// mui modal
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import BtnItem from "./BtnItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setClose } from "@/app/store/slice";
interface IFormInput {
  file: FileList;
}
const PostModal = () => {
  const showModal = useSelector((state: RootState) => state.crPost.value);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setClose());
    setImageForm(false);
  };
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setlistImg({ images: Array.from(data.file) });
  };
  const [ListImg, setlistImg] = React.useState<ListImages | undefined>(
    undefined
  );
  const [imageForm, setImageForm] = React.useState(false);
  const handleClickBtn = (e: any) => {
    if (e.target.textContent === "Photo") {
      setImageForm(true);
    }
  };

  useEffect(() => {
    console.log(imageForm);
  }, [imageForm]);
  return (
    <div>
      <Modal
        open={showModal}
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
          <div className="flex flex-row justify-between">
            {createPostMenu.map((item) => {
              return (
                <BtnItem
                  onClick={handleClickBtn}
                  key={item.label}
                  content={item.label}
                >
                  {item.icon}
                </BtnItem>
              );
            })}
          </div>
          {ListImg && (
            <div>
              {ListImg.images.map((image) => {
                return (
                  <Image
                    key={image.name}
                    src={URL.createObjectURL(image)}
                    width={50}
                    height={50}
                    alt="Picture of the author"
                  />
                );
              })}
            </div>
          )}
          <form
            className={`h-0 flex flex-col gap-4 justify-center items-center rounded-lg py-2 px-4 ${
              imageForm && " border-dashed border-4 h-80"
            }`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className=" cursor-pointer flex flex-col justify-center items-center">
              {/* input file */}
              <input
                {...register("file")}
                className="input-file"
                type="file"
                multiple
              />

              {imageForm && (
                <CloudUploadIcon
                  className=" transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125 duration-300"
                  sx={{ fontSize: "50px", color: "grey" }}
                />
              )}
              {imageForm && "Import your image"}
            </label>
            <button>submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

PostModal.propTypes = {};

export default PostModal;
