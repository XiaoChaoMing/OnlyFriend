"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { listItem } from "../../type";
import { twMerge } from "tailwind-merge";
interface MenuProp {
  listItem: listItem[];
}
interface MenuProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Menu: React.FC<MenuProp> = ({ listItem, className }) => {
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
          <Link
            href={`${link.route}`}
            key={link.label}
            className={`flex gap-4 justify-start items-center rounded-lg py-2 px-4 ${
              isActive && " bg-slate-100"
            }`}
          >
            <div className={`rounded-full p-1`}>{link.icon}</div>
            <p className=" text-dark-1">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;