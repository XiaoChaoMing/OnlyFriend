"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Card from "../../../../components/layout/Card";
import Button from "../../../../components/layout/Button";

const CardItem = () => {
  const deleteItems = () => {};
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
