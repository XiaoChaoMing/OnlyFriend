"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import Cropper from "react-easy-crop";
import {
  convertBlobUrlToFile,
  getCroppedImg,
  getDownloadUrl,
  uploadSingleImage,
} from "@/app/utils";
import Image from "next/image";
import { POST_method } from "@/app/utils/fetchApi";
import { useSession } from "next-auth/react";

interface IFormInput {
  groupName: string;
  groupImage: FileList;
  groupWall: File;
}
interface UpdateGroupProps {
  groupId?: string;
}

const UpdateGroup: React.FC<UpdateGroupProps> = ({ groupId }) => {
  const session = useSession();
  const UserId = session.data?.data.user.id;
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const [wallSrc, setWallSrc] = useState<string | null>(null);
  const [groupImagePreview, setGroupImagePreview] = useState<string | null>(
    null
  );
  const [croppedArea, setCroppedArea] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImages, setCroppedImages] = useState<any>(null);
  const [hideRawImage, setHideRawImage] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const body = {
      groupImage: "",
      groupWall: "",
      groupName: data.groupName,
    };

    if (data.groupImage[0]) {
      const uploadImage = await uploadSingleImage(data.groupImage[0]);
      body.groupImage = await getDownloadUrl(`image/${uploadImage}`);
    }

    if (data.groupWall) {
      const uploadWall = await uploadSingleImage(data.groupWall);
      body.groupWall = await getDownloadUrl(`image/${uploadWall}`);
    }

    await POST_method(
      body,
      `/group/update-group?group_id=${groupId}&uid=${UserId}`
    );
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

  return (
    <div className="flex flex-col items-start gap-2 p-8">
      <Typography variant="h5" className="mb-4">
        Update Group
      </Typography>
      {groupImagePreview && (
        <div className="h-36 w-36 rounded-md mb-4">
          <Image
            width={144}
            height={144}
            src={groupImagePreview}
            alt="Group Preview"
            className="h-36 w-36 object-cover rounded-md"
          />
        </div>
      )}
      <Button variant="contained" component="label" className="mb-4">
        Upload Group Image
        <input
          type="file"
          hidden
          {...register("groupImage")}
          accept="image/png, image/gif, image/jpeg, image/webp"
        />
      </Button>

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <TextField
          className="w-full"
          defaultValue=""
          placeholder="Group Name"
          {...register("groupName")}
          error={!!errors.groupName}
          helperText={errors.groupName ? "This field is required" : ""}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateGroup;
