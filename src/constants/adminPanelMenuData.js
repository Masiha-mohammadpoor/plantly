import { TbPlant } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCategory } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";


export const adminPanelMenuData = [
  {
    id: 1,
    title: "Home Page",
    icon: <IoHomeOutline />,
    link: "/",
  },
  {
    id: 2,
    title: "Admin Panel",
    icon: <RxDashboard />,
    link: "/admin-panel",
  },
  {
    id: 3,
    title: "Users",
    icon: <LuUsers />,
    link: "/admin-panel/users",
  },
  {
    id: 4,
    title: "Products",
    icon: <TbPlant />,
    link: "/admin-panel/products",
  },
  {
    id: 5,
    title: "Categories",
    icon: <MdOutlineCategory />,
    link: "/admin-panel/categories",
  },
  {
    id: 6,
    title: "Payments",
    icon: <IoCardOutline />,
    link: "/admin-panel/payments",
  },
];
