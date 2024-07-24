import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ImageList,
  ImageListItem,
  Modal,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PostMedia } from "../../../../../type";
import { POST_method } from "@/app/utils/fetchApi";
import { deleteFile, getDownloadUrl, uploadSingleImage } from "@/app/utils";

interface UpdateModalProps {
  postId: number;
  imageList?: PostMedia[];
  status: string | null;
  show: boolean;
  handleShow: (state: boolean) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  imageList,
  status,
  postId,
  show,
  handleShow,
}) => {
  const [initListImage, setListImage] = useState<PostMedia[]>(imageList || []);
  const [removeList, setRemoveList] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<PostMedia | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(status || "");
  const [newMediaFile, setNewMediaFile] = useState<any[] | null>(null);

  useEffect(() => {
    setListImage(imageList || []);
  }, [imageList]);

  const handleClose = () => {
    handleShow(false);
  };

  const handleOpenConfirmation = (item: PostMedia) => {
    setSelectedItem(item);
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedItem(null);
    setOpenConfirmation(false);
  };

  const handleRemoveItem = () => {
    if (selectedItem && initListImage) {
      const updatedList = initListImage.filter(
        (item) => item.mediaFile !== selectedItem.mediaFile
      );
      setListImage(updatedList);
      setRemoveList((previus) => [...previus, selectedItem]);
      handleCloseConfirmation();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).map((file) => ({
        id: Date.now(),
        mediaFile: URL.createObjectURL(file),
        RawFile: file,
        fileName: file.name,
        mediaType: file.type.startsWith("image/") ? "image" : "video",
      }));
      setListImage((prev) => [...prev, ...files]);
      setNewMediaFile(files);
    }
  };

  const onChangeStatus = (e: any) => {
    setUpdatedStatus(e.target.value);
  };
  const handleUpdatepost = async () => {
    const updateData = {
      postId: postId,
      status: updatedStatus,
      addMediaFiles: newMediaFile,
      removeMediaIds: removeList,
    };
    console.log(updateData);
    if (updateData.removeMediaIds) {
      const deletePromises = removeList.map(async (item) => {
        await deleteFile(item.mediaFile);
        return item.id;
      });

      const deleteListId = await Promise.all(deletePromises);
      updateData.removeMediaIds = deleteListId;
    }
    if (updateData.addMediaFiles) {
      const uploadPromises = updateData.addMediaFiles.map(async (item) => {
        await uploadSingleImage(item.RawFile);
        const downloadUrl = await getDownloadUrl(`image/${item.RawFile.name}`);
        return downloadUrl;
      });

      const newMediaUrls = await Promise.all(uploadPromises);
      updateData.addMediaFiles = newMediaUrls;
    }
    const updated = await POST_method(updateData, "/post/update-post");
    console.log(updated);
    return updated;
  };

  return (
    <div>
      <Modal
        open={show}
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
              Update post
            </Typography>
            <div
              className="p-2 rounded-full cursor-pointer bg-slate-200"
              onClick={handleClose}
            >
              <CloseIcon sx={{ fontSize: "25px", color: "grey" }} />
            </div>
          </div>
          <div className=" bg-slate-200 rounded-md p-3">
            <input
              value={updatedStatus}
              onChange={onChangeStatus}
              className="bg-transparent w-full outline-none"
              type="text"
              name=""
              id=""
            />
          </div>
          <div>
            {initListImage && (
              <ImageList
                sx={{ width: 500, height: 500 }}
                cols={3}
                rowHeight={164}
                className="relative"
              >
                <label className="cursor-pointer flex flex-col flex-wrap absolute z-50 left-2 top-2">
                  <input
                    className="input-file"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <CloudUploadIcon
                    className="transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125 duration-300"
                    sx={{ fontSize: "50px", color: "grey" }}
                  />
                </label>
                {initListImage.map((item) => (
                  <ImageListItem
                    className="relative overflow-hidden rounded-md"
                    key={item.mediaFile}
                  >
                    {item.mediaType === "image" ||
                    item.mediaFile.includes("image") ? (
                      // Show image
                      <img
                        className="rounded-md"
                        src={`${item.mediaFile}`}
                        alt={item.mediaFile}
                        loading="lazy"
                      />
                    ) : (
                      // show video
                      <video
                        className="rounded-md"
                        src={`${item.mediaFile}`}
                        autoPlay={true}
                        muted={true}
                      />
                    )}
                    <div
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => handleOpenConfirmation(item)}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: "20px",
                          color: "white",
                          fontWeight: "300",
                        }}
                      />
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </div>
          <div>
            <button type="button" onClick={handleUpdatepost}>
              Update Post
            </button>
          </div>
        </Box>
      </Modal>

      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleRemoveItem}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

UpdateModal.propTypes = {
  imageList: PropTypes.array,
  status: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
};

export default UpdateModal;
