"use client";
import { useGetUser } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

const linksData = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Products",
    href: "/products",
  },
  {
    id: 3,
    title: "About Us",
    href: "/about-us",
  },
  {
    id: 4,
    title: "Contact",
    href: "/contact",
  },
  {
    id: 5,
    title: "My Plant",
    href: "my-plant",
  },
];

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { user, userLoading } = useGetUser();
  const { user: data } = user || {};

  return (
    <>
      <header className="flex justify-between items-center pt-3 px-4 md:px-8 sticky top-0 bg-bg/95 z-[100] pb-3">
        <button
          onClick={() => setMenu((prev) => !prev)}
          className="lg:hidden text-3xl cursor-pointer text-secondary-800"
        >
          <IoMenu />
        </button>
        <Link href="/" className="hidden lg:block">
          <div className="flex justify-center items-end gap-x-1">
            <Image src="/Logo.png" alt="Logo" width={30} height={30} />
            <h2 className="text-primary-500 font-semibold text-base">
              PLANTLY
            </h2>
          </div>
        </Link>
        <div className="hidden lg:block"></div>
        <div className="hidden lg:block">
          <ul className="flex justify-center items-center gap-x-10 text-secondary-500">
            {linksData.map((l) => {
              return (
                <Link key={l.id} href={l.href} replace>
                  {l.title}
                </Link>
              );
            })}
          </ul>
        </div>
        <div>
          {userLoading ? (
            <div></div>
          ) : data ? (
            <div className="flex items-end gap-x-4">
              <Link href="/profile">
                <button className="cursor-pointer">
                  <CiUser className="text-2xl text-secondary-800" />
                </button>
              </Link>
              <Link href="/cart">
                <button className="cursor-pointer relative">
                  <span className="absolute text-[10px] text-white bg-red-500 rounded-full py-0.5 px-1 -top-2 -right-2">
                    {data.cart.items.length}
                  </span>
                  <CiShoppingCart className="text-2xl text-secondary-800" />
                </button>
              </Link>
            </div>
          ) : (
            <Link href="/auth/signin">
              <button className="text-sm text-white bg-primary-500 p-2 rounded-lg cursor-pointer hover:bg-primary-800 transition-all duration-300">
                Login / SignUp
              </button>
            </Link>
          )}
        </div>
      </header>
      {/* responsive menu */}
      <div
        className={`h-screen w-60 bg-primary-200 fixed top-0 z-[200] pt-4 px-4 transition-all duration-300 lg:hidden ${
          !menu ? "-left-60" : "left-0"
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <Link href="/">
            <div className="flex justify-center items-end gap-x-1">
              <Image src="/Logo.png" alt="Logo" width={30} height={30} />
              <h2 className="text-white font-semibold text-base">PLANTLY</h2>
            </div>
          </Link>
          <button
            onClick={() => setMenu((prev) => !prev)}
            className="text-white text-4xl cursor-pointer "
          >
            <IoIosClose />
          </button>
        </div>
        <div className="mt-8">
          <ul className="flex flex-col justify-start items-start gap-y-7 text-white pl-8">
            {linksData.map((l) => {
              return (
                <Link key={l.id} href={l.href} replace>
                  {l.title}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
