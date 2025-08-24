"use client";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { menuData } from "@/constants/data";
import { usePathname } from "next/navigation";

const ProfileMenu = ({ openMenu, setOpenMenu }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`h-full ${
        openMenu ? "col-span-3 px-4" : "col-span-1 px-6"
      } bg-primary-200 pt-1.5`}
    >
      {/* logo */}
      <div className="w-full flex justify-between items-center">
        <div
          className={`${
            openMenu ? "flex" : "hidden"
          } justify-center items-end gap-x-1`}
        >
          <Image src="/Logo.png" alt="Logo" width={30} height={30} />
          <h2 className="text-white font-semibold text-base">PLANTLY</h2>
        </div>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="cursor-pointer w-10 h-10 bg-white/20 rounded-lg text-white flex justify-center items-center"
        >
          <LuMenu className="text-2xl" />
        </button>
      </div>
      {/* menu */}
      <div className="mt-16 w-full">
        {menuData.map((i) => {
          return (
            <Link key={i.id} href={i.link}>
              <button
                className={`${
                  pathname === i.link && "bg-white/20"
                } my-3 cursor-pointer text-white flex items-center ${
                  openMenu
                    ? "text-xl px-4 py-2 gap-x-4 justify-start"
                    : "text-xl w-10 h-10 justify-center"
                } w-full rounded-lg transition-all duration-300 hover:bg-white/20`}
              >
                {i.icon}
                {openMenu && <span className="text-base">{i.title}</span>}
              </button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default ProfileMenu;