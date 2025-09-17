"use client";
import Link from "next/link";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { useGetUser } from "@/hooks/useAuth";
import { LuMenu } from "react-icons/lu";

const ProfileHeader = ({ setShowMenu }) => {
  const { user, userLoading } = useGetUser();

  return (
    <header className="sticky top-0 w-full h-12 bg-primary-200 flex justify-between lg:justify-end items-center px-3 md:px-10 py-2">
      <button
        onClick={setShowMenu}
        className="cursor-pointer w-9 h-9 bg-white/20 rounded-lg text-white flex lg:hidden justify-center items-center"
      >
        <LuMenu className="text-2xl" />
      </button>
      {!userLoading && user && (
        <div className="flex items-end gap-x-5 pt-2">
          <Link href="/cart">
            <button className="cursor-pointer relative">
              <span className="absolute text-[10px] text-white bg-red-500 rounded-full py-0.5 px-1 -top-2 -right-2">
                {user.user.cart.items.length}
              </span>
              <CiShoppingCart className="text-2xl text-white" />
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default ProfileHeader;
