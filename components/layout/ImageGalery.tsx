import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image";
import "swiper/css/pagination";
import { isImageOrVideoPath } from "@/app/utils";
// import required modules
interface ImageGaleryProps {
  imageList?: string[];
}

const ImageGalery: React.FC<ImageGaleryProps> = ({ imageList }) => {
  const galeryItem = (path: string) => {
    if (isImageOrVideoPath(path) === "image") {
      return (
        <SwiperSlide key={path} style={{ height: "700px", width: "500px" }}>
          <Image
            src={path}
            layout="fill"
            objectFit="contain"
            alt="Picture of the author"
          />
        </SwiperSlide>
      );
    } else if (isImageOrVideoPath(path) === "video") {
      return (
        <SwiperSlide
          className="bg-black py-3"
          key={path}
          style={{ height: "700px", width: "500px" }}
        >
          <video
            controls
            className="h-full w-full object-contain"
            playsInline
            muted
            loop
            autoPlay
            preload="none"
          >
            <source src={path} />
          </video>
        </SwiperSlide>
      );
    }
  };
  return (
    <>
      <Swiper
        navigation
        pagination={{ type: "bullets" }}
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {}}
        className="min-h-96 rounded-lg"
      >
        {imageList?.map((path) => {
          return galeryItem(path);
        })}
      </Swiper>
    </>
  );
};

ImageGalery.propTypes = {};

export default ImageGalery;
