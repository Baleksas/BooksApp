"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const Sidebar = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start m-4 justify-start">
        <Navbar />
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link className={` ${pathname === "/" ? "active" : ""}`} href="/">
              home
            </Link>
          </li>
          <li>
            <Link
              className={` ${pathname === "/dashboard" ? "active" : ""}`}
              href="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
