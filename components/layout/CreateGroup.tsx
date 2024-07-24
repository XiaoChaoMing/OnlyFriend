import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Image from "next/image";
import {
  convertBlobUrlToFile,
  getCroppedImg,
  getDownloadUrl,
  uploadSingleImage,
} from "@/app/utils";
import { POST_method } from "@/app/utils/fetchApi";
import Cropper from "react-easy-crop";

interface IFormInput {
  groupImage: FileList;
  groupWall: File | null;
  groupName: string;
}

interface CreateGroupProps {
  userId?: Number;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormInput>();
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );
  const [croppedArea, setCroppedArea] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [wallSrc, setWallSrc] = useState<string | null>(null);
  const [croppedImages, setCroppedImages] = useState<any>(null);
  const [hideRawImage, setHideRawImage] = useState(false);
  const [groupImagePreview, setGroupImagePreview] = useState<string | null>(
    null
  );
  const [groupWallPreview, setGroupWallPreview] = useState<string | null>(null);

  const onSubmitForm: SubmitHandler<IFormInput> = async (data) => {
    const body = {
      groupImage: "",
      groupWall: "",
      groupName: data.groupName,
    };

    if (data.groupImage && data.groupImage.length > 0) {
      const uploadImage = await uploadSingleImage(data.groupImage[0]);
      body.groupImage = await getDownloadUrl(`image/${uploadImage}`);
    }

    if (data.groupWall) {
      const uploadWall = await uploadSingleImage(data.groupWall);
      body.groupWall = await getDownloadUrl(`image/${uploadWall}`);
    }

    await POST_method(body, `/group/create-group?uid=${userId}`);
    window.location.reload();
  };

  const onWallChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setCroppedImages(null);
      setHideRawImage(false);
      reader.onload = () => setWallSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (wallSrc && croppedArea) {
        const croppedImage = await getCroppedImg(wallSrc, croppedArea);
        setCroppedImages(croppedImage);
        setHideRawImage(true);
        const file = await convertBlobUrlToFile(croppedImage);
        setValue("groupWall", file);
      }
    } catch (e) {
      console.error(e);
    }
  }, [wallSrc, croppedArea, setValue]);

  const groupImage = watch("groupImage");
  useEffect(() => {
    if (groupImage && groupImage.length > 0) {
      const imageUrl = URL.createObjectURL(groupImage[0]);
      setGroupImagePreview(imageUrl);
    }
  }, [groupImage]);

  const groupWall = watch("groupWall");
  useEffect(() => {
    if (groupWall) {
      const imageUrl = URL.createObjectURL(groupWall);
      setGroupWallPreview(imageUrl);
    }
  }, [groupWall]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Create a New Group
      </Typography>
      {groupImagePreview && (
        <Box mt={2}>
          <Box position="relative" width="140px" height="140px">
            <Image
              src={groupImagePreview}
              alt="Group Image Preview"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Box>
      )}
      <FormControl error={Boolean(errors.groupImage)}>
        <label htmlFor="groupImage">
          <Button variant="contained" component="span">
            Upload Group Image
          </Button>
        </label>
        <input
          type="file"
          id="groupImage"
          style={{ display: "none" }}
          {...register("groupImage", { required: "Group Image is required" })}
        />
        {errors.groupImage && (
          <FormHelperText>{errors.groupImage.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={Boolean(errors.groupWall)}>
        <div className="mb-4">
          {croppedImages && (
            <img src={croppedImages} alt="Cropped" className="mb-4" />
          )}
          <Button variant="contained" component="label" className="mb-4">
            Upload Group Wall
            <input
              type="file"
              hidden
              onChange={onWallChange}
              accept="image/png, image/gif, image/jpeg, image/webp"
            />
          </Button>
        </div>

        {wallSrc && !hideRawImage && (
          <div className="relative w-96 h-96 mb-4">
            <Cropper
              image={wallSrc}
              crop={crop}
              zoom={zoom}
              aspect={4.8 / 2}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
        {wallSrc && !hideRawImage && (
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            className="mb-4"
          >
            Crop Image
          </Button>
        )}
      </FormControl>

      <TextField
        id="groupName"
        label="Group Name"
        variant="outlined"
        {...register("groupName", { required: "Group Name is required" })}
        error={Boolean(errors.groupName)}
        helperText={errors.groupName ? errors.groupName.message : ""}
      />

      <Button type="submit" variant="contained" color="primary">
        Create Group
      </Button>
    </Box>
  );
};

export default CreateGroup;
