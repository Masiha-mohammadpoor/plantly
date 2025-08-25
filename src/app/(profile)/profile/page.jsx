"use client";
import { TbPlant } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import OrderTable from "./OrdersTable";
import { useGetUser } from "@/hooks/useAuth";

const Profile = () => {
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen overflow-y-auto pb-20 px-8 pt-8">
      {/* cards */}
      <article className="grid grid-cols-12 gap-x-4">
        {/* 1 */}
        <div className="h-32 col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <FiCalendar />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>Date Of Joining</h2>
              <p>3</p>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="h-32 col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <TbPlant />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>My Plant</h2>
              <p>3</p>
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="h-32 col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <AiOutlineProduct />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>My Orders</h2>
              <p>3</p>
            </div>
          </div>
        </div>
      </article>
      {/* last orders */}
      <article className="grid grid-cols-12 gap-x-4  mt-10">
        <div className="col-span-12 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Latest Orders</h2>
          <Link href="/profile/my-orders">
            <button className="cursor-pointer flex justify-center items-center gap-x-2 px-2 py-1 rounded-lg text-white  bg-primary-200">
              All Orders <FaLongArrowAltRight />
            </button>
          </Link>
        </div>
      </article>
      <OrderTable/>
    </section>
  );
};

export default Profile;
