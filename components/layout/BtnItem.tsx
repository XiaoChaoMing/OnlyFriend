import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface BtnProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const BtnItem: React.FC<BtnProp> = ({
  content,
  children,
  className,
  ...prop
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `flex flex-row gap-4 justify-between hover:bg-slate-200 p-3 rounded-lg`,
        className
      )}
      {...prop}
    >
      {children}
      {content}
    </button>
  );
};

export default BtnItem;
