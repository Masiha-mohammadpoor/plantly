"use client";
import { TbPlant } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import { toLoacalDate } from "@/utils/localDate";
import { useGetPayments } from "@/hooks/usePayments";
import OrdersTable from "./OrdersTable";
import Link from "next/link";

const Profile = () => {
  const { user, userLoading } = useGetUser();
  const { payments, paymentsLoading } = useGetPayments(user?.user?._id);

  if (userLoading && paymentsLoading) return <Loading />;
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <article className="grid grid-cols-12 gap-4">
        <div className="h-32 col-span-12 sm:col-span-6 md:col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
              <FiCalendar />
            </span>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>Date Of Joining</h2>
              <p className="text-sm">{toLoacalDate(user?.user?.createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="h-32 col-span-12 sm:col-span-6 md:col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <Link href="/profile/my-orders">
              <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
                <TbPlant />
              </span>
            </Link>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>My Plant</h2>
              <div>{payments?.pagination?.totalProducts || 0}</div>
            </div>
          </div>
        </div>
        <div className="h-32 col-span-12 sm:col-span-6 md:col-span-4 bg-primary-200 rounded-lg p-4 text-white relative overflow-hidden flex justify-start items-center">
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -top-20 -right-12"></div>
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/30 -bottom-20 -right-12"></div>
          <div className="flex items-center gap-x-4">
            <Link href="/profile/my-orders">
              <span className="w-16 h-16 text-white rounded-lg bg-primary-500 flex justify-center items-center text-3xl">
                <AiOutlineProduct />
              </span>
            </Link>
            <div className="h-16 flex flex-col justify-between items-start">
              <h2>My Orders</h2>
              <p>{payments?.pagination?.total || 0}</p>
            </div>
          </div>
        </div>
      </article>
      <OrdersTable user={user} userLoading={userLoading} limit={5} header />
    </section>
  );
};

export default Profile;
