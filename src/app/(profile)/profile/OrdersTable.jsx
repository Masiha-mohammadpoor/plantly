"use client";
import { orderTableData } from "@/constants/orderTableData";
import { useGetUser } from "@/hooks/useAuth";
import { useGetPayments } from "@/hooks/usePayments";
import Loading from "@/components/Loading";
import Link from "next/link";
import { toLoacalDate } from "@/utils/localDate";

const OrderTable = () => {
  const { user, userLoading } = useGetUser();
  const { payments, paymentsLoading } = useGetPayments(
    `${user?.user?._id}?limit=5`
  );

  if (userLoading && paymentsLoading) return <Loading />;
  return (
    <div className="overflow-auto my-10">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {orderTableData.map((h) => {
              return (
                <th
                  key={h.id}
                  className="whitespace-nowrap table__th text-center"
                >
                  {h.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {payments?.data.map((p, index) => {
            return (
              <tr key={p._id}>
                <td className="table__td font-bold text-lg">{index + 1}</td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {p.invoiceNumber}
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {p.items.map((product) => {
                      return (
                        <Link
                          href={`/products/${product.slug}`}
                          key={product._id}
                        >
                          <span className="bg-primary-200 flex items-center gap-x-2 rounded-full px-2">
                            <span className="text-white">{product.name}</span>
                            <span className="text-white font-bold">
                              x{product.quantity}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td text-lg text-center">
                  $ <span>{p.amount.toFixed(2)}</span>
                </td>
                <td className="table__td text-nowrap">
                  {toLoacalDate(p.createdAt)}
                </td>
                <td className="table__td text-nowrap">
                  <span className="px-2 py-1 rounded-full text-white bg-green-500">
                    SUCCESS
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
