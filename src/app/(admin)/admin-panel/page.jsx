"use client";
import { TbPlant } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import { useGetAllUsers } from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import { toLoacalDate } from "@/utils/localDate";
import { useGetAllPayments } from "@/hooks/usePayments";
import { useEffect, useState } from "react";
import OrdersTable from "@/app/(profile)/profile/OrdersTable";
import { LuUsers } from "react-icons/lu";
import { IoCardOutline } from "react-icons/io5";
import { useGetAllProducts } from "@/hooks/useProducts";
import PaymentsTable from "./paymentsTable";


const AdminPanel = () => {
  const { users, usersLoading } = useGetAllUsers();
  const {products,productsLoading} = useGetAllProducts();
  const {payments,paymentsLoading} = useGetAllPayments();
  

  if (usersLoading && productsLoading && paymentsLoading) return <Loading />;
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <article className="grid grid-cols-12 gap-x-4">
        <div className="h-32 col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <LuUsers />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>Users</h2>
              <p className="text-sm">{users?.data?.length}</p>
            </div>
          </div>
        </div>
        <div className="h-32 col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <TbPlant />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>Products</h2>
              <div>{products?.count}</div>
            </div>
          </div>
        </div>
        <div className="h-32 col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <IoCardOutline />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>Payments</h2>
              <p>{payments?.pagination?.total}</p>
            </div>
          </div>
        </div>
      </article>
      <article className="grid grid-cols-12 gap-x-4  mt-10">
        <div className="col-span-12 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Latest Payments</h2>
          <Link href="/admin-panel/payments">
            <button className="cursor-pointer flex justify-center items-center gap-x-2 px-2 py-1 rounded-lg text-white  bg-primary-200">
              All Payments <FaLongArrowAltRight />
            </button>
          </Link>
        </div>
      </article>
      <PaymentsTable limit={5}/>
    </section>
  );
};

export default AdminPanel;
