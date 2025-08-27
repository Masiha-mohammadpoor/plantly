"use client";
import { orderTableData } from "@/constants/orderTableData";
import { useGetAllPayments, useGetPayments } from "@/hooks/usePayments";
import Loading from "@/components/Loading";
import Link from "next/link";
import { toLoacalDate } from "@/utils/localDate";
import PaginationComponent from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import { paymentsTable } from "@/constants/paymentsTable";

const PaymentsTable = ({ limit }) => {
  const searchParams = useSearchParams();

  const createQueryString = () => {
    const params = new URLSearchParams();

    if (limit) {
      params.set("limit", limit.toString());
    }
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
    return params.toString();
  };

  const { payments, paymentsLoading } = useGetAllPayments(
    `?${createQueryString()}`
  );

  if (paymentsLoading) return <Loading />;

  return (
    <div className="overflow-auto my-10">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {paymentsTable.map((h) => {
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
                <td className="table__td font-bold text-lg">
                  {(payments?.pagination?.page - 1) * 10 + (index + 1)}
                </td>
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
                <td className="table__td text-sm text-center">
                  <p>{p.user.name}</p>
                  <p>{p.user.email}</p>
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
      <div className="w-full flex justify-center mt-10">
        {!limit && <PaginationComponent count={payments?.pagination?.pages} />}
      </div>
    </div>
  );
};

export default PaymentsTable;
