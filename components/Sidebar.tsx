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

  const hideSidebar = () => {
    const sidebar = document.getElementById(
      "sidebar-toggle"
    ) as HTMLInputElement;
    if (sidebar) {
      sidebar.checked = false;
    }
  };

  return (
    <div className="drawer lg:drawer-open ">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start m-4 justify-start">
        <Navbar />
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar-toggle"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link
              onClick={hideSidebar}
              className={` ${pathname === "/" ? "active" : ""}`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={hideSidebar}
              className={` ${pathname === "/collections" ? "active" : ""}`}
              href="/collections"
            >
              Reading lists
            </Link>
          </li>
          <li>
            <Link
              onClick={hideSidebar}
              className={` ${pathname === "/library" ? "active" : ""}`}
              href="/library"
            >
              Library
            </Link>
          </li>
          <li>
            <Link
              onClick={hideSidebar}
              className={` ${pathname === "/reviews" ? "active" : ""}`}
              href="/reviews"
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
