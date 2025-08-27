"use client";
import Link from "next/link";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { useGetUser } from "@/hooks/useAuth";

const ProfileHeader = () => {
  const { user, userLoading } = useGetUser();

  return (
    <header className="w-full h-12 bg-primary-200 flex justify-end items-center px-10 pt-2.5">
      {!userLoading && user && (
        <div className="flex items-center gap-x-5">
          <Link href="/cart">
            <button className="cursor-pointer relative">
              <span className="absolute text-[10px] text-white bg-red-500 rounded-full py-0.5 px-1 -top-2 -right-2">
                {user.user.cart.items.length}
              </span>
              <CiShoppingCart className="text-2xl text-white" />
            </button>
          </Link>
          <Link href="/profile">
            <button className="cursor-pointer">
              <CiUser className="text-2xl text-white" />
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default ProfileHeader;
