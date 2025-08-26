"use client";
import { useGetUser } from "@/hooks/useAuth";
import OrdersTable from "../OrdersTable";
import PaginationComponent from "@/components/Pagination";

const MyOrders = () => {
  const { user, userLoading } = useGetUser();

  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>
      <OrdersTable user={user} userLoading={userLoading}/>
    </section>
  );
};

export default MyOrders;
