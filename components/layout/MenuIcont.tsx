"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { listItem } from "../../type";
import { twMerge } from "tailwind-merge";
interface MenuIcontProp {
  listItem: listItem[];
  className?: string;
  handleMenu: (id: number | undefined | null) => void;
}
interface MenuIcontProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const MenuIcont: React.FC<MenuIcontProp> = ({
  listItem,
  className,
  handleMenu,
}) => {
  const pathName = usePathname();
  return (
    <div
      className={
        (twMerge(`flex flex-col gap-3 overflow-auto max-h-[365px]`), className)
      }
    >
      {listItem.map((link) => {
        const isActive = pathName === link.route;
        return (
          <div
            key={link.id}
            onClick={() => {
              handleMenu(link.id);
            }}
          >
            <Link
              href={`${link.route}`}
              className={` ${isActive && " bg-slate-100"}`}
            >
              <div className={`rounded-full p-1`}>{link.icon}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MenuIcont;
