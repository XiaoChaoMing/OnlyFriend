import React, { useContext, useEffect, useState } from "react";
import { createPostMenu, listBackground } from "./../../constants/index";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import BtnItem from "./BtnItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setClose } from "@/app/store/slice";
import { getDownloadUrl, uploadSingleImage } from "@/app/utils";
import { useSession } from "next-auth/react";
import { POST_method } from "@/app/utils/fetchApi";
import { Posts } from "../../type";
import { SocketContext } from "@/app/socket/socketContext";
import { stringify } from "querystring";

interface IFormInput {
  userId: Number | undefined;
  postTypeId: number;
  Status: string;
  FileLists: FileList;
  mediaFile: string[];
}

interface PostModal {
  postType: number;
  groupId?: string;
}
const PostModal: React.FC<PostModal> = ({ postType, groupId }) => {
  const ws = useContext(SocketContext);
  const session = useSession();
  const UserId = session.data?.data.user.id;
  const showModal = useSelector((state: RootState) => state.appAction.crPost);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [ListImg, setlistImg] = useState<FileList | null>(null);
  const [imageForm, setImageForm] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [statusOnly, setStatusOnly] = useState(false);
  const [background, setBackground] = useState<string>("white");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const createNotify = (content: any) => {
    const newNotify = {
      notifyTypeId: "1",
      fromUserId: UserId,
      contents: content,
    };
    if (ws) {
      ws.emit("createNotify", newNotify);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setStatus("pending");
    try {
      const { FileLists, ...postData } = { ...data, mediaFile: [] as string[] };
      const filePromises = Array.from(data.FileLists || []).map(
        async (file) => {
          await uploadSingleImage(file);
          const downloadUrl = await getDownloadUrl(`image/${file.name}`);
          return downloadUrl;
        }
      );
      const mediaFiles = await Promise.all(filePromises);
      postData.mediaFile = mediaFiles;
      postData.userId = UserId;
      postData.postTypeId = postType;
      const createNewPost = async (postData: any) => {
        const newPost = await POST_method(
          postData,
          `/post/createPost?groupId=${groupId}`
        );
        return newPost.data.newPost.id;
      };
      const { Status, ...otherData } = data;
      const id = await createNewPost(postData);
      createNotify(JSON.stringify({ Status, id }));
      setStatus("success");
      setConfirmClose(true);
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    setlistImg(e.target.files);
  };

  const handleClickBtn = (e: any) => {
    if (e.target.textContent === "Photo") {
      setStatusOnly(false);
      setImageForm(true);
    } else {
      setStatusOnly(true);
      setImageForm(false);
    }
  };

  const handleClose = () => {
    dispatch(setClose());
    setlistImg(null);
    setImageForm(false);
    setStatus("idle");
    reset();
  };

  const handleConfirmClose = () => {
    handleClose();
    setConfirmClose(false);
  };
  const handleChangeBg = (bg: any) => {
    setBackground(bg);
  };

  useEffect(() => {}, [ListImg, loading]);

  useEffect(() => {
    if (!ws || !UserId) {
      console.log("Socket or session not available");
      return;
    }
  });

  useEffect(() => {}, [background]);
  return (
    <div>
      <Modal
        open={showModal}
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
              {"Create post"}
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={handleClose}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="What do you think?"
              multiline
              rows={4}
              {...register("Status", { required: true })}
              error={!!errors.Status}
              helperText={errors.Status ? "This field is required" : ""}
            />

            <div className="flex flex-row justify-start gap-4">
              {createPostMenu.map((item) => (
                <BtnItem
                  onClick={handleClickBtn}
                  key={item.label}
                  content={item.label}
                >
                  {item.icon}
                </BtnItem>
              ))}
            </div>
            <div
              className={`h-0 flex flex-col gap-4 justify-center items-center rounded-lg py-2 px-4 ${
                imageForm && "border-dashed border-4 min-h-[300px]"
              }`}
            >
              <label className="cursor-pointer flex flex-col flex-wrap h-[100%] w-[100%]">
                <input
                  {...register("FileLists")}
                  onInput={handleFileChange}
                  className="input-file"
                  type="file"
                  multiple
                />
                {imageForm && ListImg ? (
                  <div className="flex flex-wrap gap-2">
                    <CloudUploadIcon
                      className={`absolute z-30 transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125 duration-300`}
                      sx={{ fontSize: "50px", color: "white" }}
                    />
                    {Array.from(ListImg).map((file, index) => {
                      const isVideo =
                        file.type.startsWith("video/") ||
                        file.name.match(/\.(mp4|avi|mkv|mov|wmv)$/i);
                      return (
                        <div
                          key={index}
                          className="relative w-32 h-32 flex justify-center items-center overflow-hidden rounded-md"
                        >
                          {isVideo ? (
                            <video
                              autoPlay
                              muted
                              className="absolute inset-0 w-full h-full object-cover rounded-md"
                            >
                              <source
                                src={URL.createObjectURL(file)}
                                type={file.type}
                              />
                            </video>
                          ) : (
                            <Image
                              src={URL.createObjectURL(file)}
                              layout="fill"
                              objectFit="cover"
                              alt="Uploaded image"
                              className="rounded-md"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  imageForm && (
                    <CloudUploadIcon
                      className={`transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125 duration-300`}
                      sx={{ fontSize: "50px", color: "grey" }}
                    />
                  )
                )}
              </label>
            </div>
            {statusOnly ? (
              <div className="flex flex-col gap-2">
                <input
                  className={`${background} ${
                    background === "white" ? "text-black" : "text-white"
                  } w-full h-60 border-none outline-none pl-20 `}
                  placeholder="What do you think ?"
                  type="text"
                />
                <div className="overflow-scroll overflow-y-hidden">
                  <div className="flex flex-row gap-3 items-center w-fit h-12">
                    {listBackground.map((bg) => {
                      return (
                        <div
                          onClick={() => {
                            handleChangeBg(bg.bg);
                          }}
                          key={bg.id}
                          className={`${bg.bg} w-10 h-10`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {status === "pending" && (
              <Alert severity="info" className="mt-4">
                Submitting your post...
              </Alert>
            )}
            {status === "success" && (
              <Alert severity="success" className="mt-4">
                Post {"created"} successfully!
              </Alert>
            )}
            {status === "error" && (
              <Alert severity="error" className="mt-4">
                There was an error submitting your post. Please try again.
              </Alert>
            )}
          </form>
        </Box>
      </Modal>
      <Dialog
        open={confirmClose}
        onClose={() => setConfirmClose(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Close Modal</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            Your post has been {"created"} successfully. Do you want to close
            the modal?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmClose(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PostModal.propTypes = {};

export default PostModal;
