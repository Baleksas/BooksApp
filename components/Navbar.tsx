import { useUser } from "@auth0/nextjs-auth0/client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { user, error, isLoading } = useUser();
  // server component
  // const { user } = await getSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <label
          htmlFor="sidebar-toggle"
          className="btn  drawer-button lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} />{" "}
        </label>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" href="/">
          Read away
        </Link>
      </div>
      <div className="navbar-end">
        {!user && (
          <div>
            <Link className="btn btn-outline" href="/api/auth/login">
              Login
            </Link>
          </div>
        )}
        <div className="dropdown dropdown-end">
          {user && (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {/* login func */}
              <div className="w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  alt={user.name as string}
                  src={user.picture as string}
                />
              </div>
            </div>
          )}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href="/api/auth/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
