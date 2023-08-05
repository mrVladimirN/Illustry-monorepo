import React from "react";

import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { ContextValue, useStateContext } from "../theme-provider";
import { siteConfig } from "@/config/site";
const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } =
    useStateContext() as ContextValue;
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 ";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const router = useRouter();

  const isLinkActive = (linkName: string) => {
    return router.pathname === `/${linkName}`;
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <Image
                src="/logo.svg"
                alt="Illustry Logo"
                width={100}
                height={100}
                className="object-contain"
              ></Image>
            </Link>
            <Link href="/projects"></Link>
            <button
              suppressHydrationWarning
              type="button"
              onClick={() =>
                setActiveMenu((prevActiveMenu: boolean) => {
                  return !prevActiveMenu;
                })
              }
              style={{ color: "red" }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            {siteConfig.mainNav.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                <Link
                  href={`/${item.href}`}
                  key={item.title}
                  passHref
                  onClick={handleCloseSideBar}
                  className={isLinkActive(item.title) ? activeLink : normalLink}
                  style={{
                    ...(isLinkActive(item.title)
                      ? { backgroundColor: "red" }
                      : ""),
                  }}
                >
                  <span className="capitalize ">{item.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
