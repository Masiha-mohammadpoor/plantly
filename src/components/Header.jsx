"use client";
import { useGetUser } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { CiUser, CiShoppingCart } from "react-icons/ci";

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
  const { user, userLoading } = useGetUser();
  const {user : data} = user || {};

  return (
    <header className="flex justify-between items-center pt-3 px-8">
      <Link href="/">
        <div className="flex justify-center items-end gap-x-1">
          <Image src="/Logo.png" alt="Logo" width={30} height={30} />
          <h2 className="text-primary-500 font-semibold text-base">PLANTLY</h2>
        </div>
      </Link>
      <div></div>
      <div>
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
          <div className="flex gap-x-4">
            <button>
              <CiUser className="text-2xl text-secondary-800" />
            </button>
            <button>
              <CiShoppingCart className="text-2xl text-secondary-800" />
            </button>
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
  );
};

export default Header;
