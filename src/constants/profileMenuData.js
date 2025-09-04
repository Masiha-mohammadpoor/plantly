import { TbPlant, TbLogout2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa6";


export const profileMenuData = [
  {
    id: 1,
    title: "Home Page",
    icon: <IoHomeOutline />,
    link: "/",
  },
  {
    id: 2,
    title: "Profile",
    icon: <RxDashboard />,
    link: "/profile",
  },
  {
    id: 3,
    title: "User Information",
    icon: <LuUserRound />,
    link: "/profile/user-information",
  },
  {
    id: 4,
    title: "My Orders",
    icon: <TbPlant />,
    link: "/profile/my-orders",
  },
  {
    id: 5,
    title: "Liked Products",
    icon: <FaRegHeart />,
    link: "/profile/liked-products",
  },
  {
    id: 6,
    title: "Saved Products",
    icon: <FaRegBookmark />,
    link: "/profile/saved-products",
  }
];
