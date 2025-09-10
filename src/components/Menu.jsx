"use client";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import toast from "react-hot-toast";
import { useGetUser, useLogout } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Menu = ({
  showMenu,
  setShowMenu,
  openMenu,
  setOpenMenu,
  menuData,
  closeMenu,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutateAsync } = useLogout();
  const queryClient = useQueryClient();
  const { user, userLoading } = useGetUser();

  const logoutHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries(["get-user"]);
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <aside
      className={`transition-all duration-300 h-screen lg:h-full w-[250px] lg:w-auto fixed lg:static top-0 ${
        showMenu ? "left-0" : "-left-[250px]"
      } ${
        openMenu
          ? "lg:col-span-3 px-4 lg:px-4 z-[200]"
          : "px-4 lg:col-span-1 lg:px-6 z-[200]"
      } bg-primary-500 lg:bg-primary-200 pt-3 lg:pt-1.5`}
    >
      {/* logo */}
      <div className="w-full flex justify-between items-center">
        <div
          className={`${
            openMenu ? "flex" : "lg:hidden flex"
          } justify-center items-end gap-x-1`}
        >
          <Image src="/Logo.png" alt="Logo" width={30} height={30} />
          <h2 className="text-white font-semibold text-base">PLANTLY</h2>
        </div>
        <button
          onClick={closeMenu}
          className="text-3xl text-white cursor-pointer lg:hidden"
        >
          <IoClose />
        </button>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="cursor-pointer w-10 h-10 bg-white/20 rounded-lg text-white hidden lg:flex justify-center items-center"
        >
          <LuMenu className="text-2xl" />
        </button>
      </div>
      {/* menu */}
      <div className="mt-10 w-full">
        {menuData?.map((i) => {
          return (
            <Link key={i.id} href={i.link} onClick={() => setShowMenu(false)}>
              <button
                className={`${
                  pathname === i.link && "bg-white/20"
                } my-3 cursor-pointer text-white flex items-center px-4 py-2 gap-x-4 justify-start ${
                  openMenu
                    ? "text-xl"
                    : "text-xl lg:px-0 lg:py-0 lg:gap-x-0 lg:w-10 lg:h-10 lg:justify-center"
                } w-full rounded-lg transition-all duration-300 hover:bg-white/20`}
              >
                {i.icon}
                <span
                  className={`text-base ${
                    openMenu ? "block" : "lg:hidden block"
                  }`}
                >
                  {i.title}
                </span>
              </button>
            </Link>
          );
        })}
        {!userLoading &&
          user.user.role === "ADMIN" &&
          pathname.startsWith("/profile") && (
            <Link href="/admin-panel">
              <button
                className={`my-3 cursor-pointer text-white flex items-center  px-4 py-2 gap-x-4 justify-start  ${
                  openMenu
                    ? "text-xl"
                    : "text-xl lg:px-0 lg:py-0 lg:gap-x-0 lg:w-10 lg:h-10 lg:justify-center"
                } w-full rounded-lg transition-all duration-300 hover:bg-white/20`}
              >
                <MdOutlineAdminPanelSettings />
                <span
                  className={`text-base ${
                    openMenu ? "block" : "lg:hidden block"
                  }`}
                >
                  Admin Panel
                </span>
              </button>
            </Link>
          )}

        <button
          onClick={logoutHandler}
          className={`my-3 cursor-pointer text-white flex items-center px-4 py-2 gap-x-4 justify-start ${
            openMenu
              ? "text-xl"
              : "text-xl lg:px-0 lg:py-0 lg:gap-x-0 lg:w-10 lg:h-10 lg:justify-center"
          } w-full rounded-lg transition-all duration-300 hover:bg-white/20`}
        >
          <TbLogout2 />
          <span
            className={`text-base ${openMenu ? "block" : "lg:hidden block"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Menu;
