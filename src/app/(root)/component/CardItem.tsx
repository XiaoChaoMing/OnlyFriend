"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Card from "../../../../components/layout/Card";
import Button from "../../../../components/layout/Button";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage, app } from "@/app/utils/firebseConfig";
const CardItem = () => {
  const deleteItems = () => {};
  useEffect(() => {
    const getUrl = async () => {
      try {
        const pathReference = ref(storage, "image/test1.jpg");
        const url = await getDownloadURL(pathReference);
        console.log(url);
      } catch (error) {
        console.error("Error fetching download URL:", error);
      }
    };

    getUrl();
  }, []);
  return (
    <div className="flex flex-row gap-3 items-center bg-white rounded-md p-4 mx-10 cursor-pointer relative">
      <Image src={`/avatar.jpg`} height={100} width={100} alt="db" />
      <div className="flex flex-col gap-2 -center">
        <p>Status</p>
        <Card
          className="hover:bg-transparent"
          friendName="minh nguyen"
          width={23}
          height={23}
        />
      </div>
      <Button
        handleFunc={deleteItems}
        className="h-fit justify-self-end absolute right-5"
        text="Delete shared"
      />
    </div>
  );
};

CardItem.propTypes = {};

export default CardItem;
