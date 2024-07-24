import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebseConfig";
import createImage from "react-easy-crop";
import { format } from "date-fns";
import { randomUUID } from "crypto";

export function isImageOrVideoPath(msgText: string) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const videoExtensions = [".mp4", ".avi", ".mkv", ".mov", ".wmv"];
  const audioExtensions = [".mp3", ".wav"];
  try {
    const url = new URL(msgText);

    const pathname = url.pathname;

    const fileExtension = pathname
      .substring(pathname.lastIndexOf("."))
      .toLowerCase();

    if (imageExtensions.includes(fileExtension)) {
      return "image";
    } else if (videoExtensions.includes(fileExtension)) {
      return "video";
    } else if (audioExtensions.includes(fileExtension)) {
      return "audio";
    } else {
      return "text";
    }
  } catch (e) {
    return "text";
  }
}
export const openCenteredWindow = (
  url: string,
  name: string,
  width: number,
  height: number
) => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  window.open(
    url,
    name,
    `height=${height}px,width=${width}px,top=${top},left=${left}`
  );
};
export const uploadSingleImage = async (image: File) => {
  const storageRef = ref(storage, `image/${image.name}`);
  const metadata = {
    contentType: "image/jpeg/png",
  };
  await uploadBytes(storageRef, image, metadata);
  return image.name;
};

export const getDownloadUrl = async (url: string) => {
  const storageRef = ref(storage, url);
  return await getDownloadURL(storageRef);
};
export const deleteFile = async (url: string) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return null;
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item ${key}:`, error);
  }
};
export const NotifyTypeCheck = (notifyType: number) => {
  switch (notifyType) {
    case 1:
      return "Có bài đăng mới";
    case 2:
      return "Có tin nhắn mới";
    case 3:
      return "Đã bình luận về bài viết của bạn";
    case 4:
      return "Đã thích bài viết của bạn";
    case 5:
      return "Đã theo dõi bạn";
    default:
      break;
  }
};

export const createImager = (url: any) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImg = async (imageSrc: string, crop: any) => {
  const image = (await createImager(imageSrc)) as CanvasImageSource;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx?.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
};

export const convertBlobUrlToFile = async (blobUrl: any) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const date = new Date();
  const curDate = date.toISOString().slice(0, 10);
  const random = self.crypto.randomUUID();

  const file = new File([blob], `image-${curDate}-${random}.jpeg`, {
    type: blob.type,
  });
  return file;
};
