"use client";
import Loading from "@/components/Loading";
import { toLoacalDate } from "@/utils/localDate";
import { useGetAllProducts } from "@/hooks/useProducts";
import { productsTable } from "@/constants/productsTable";
import Image from "next/image";

const ProductsTable = () => {
  const { products, productsLoading } = useGetAllProducts();

  if (productsLoading) return <Loading />;
  return (
    <div className="overflow-auto my-10">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productsTable.map((p) => {
              return (
                <th
                  key={p.id}
                  className="whitespace-nowrap table__th text-center"
                >
                  {p.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products?.data.map((p, index) => {
            return (
              <tr key={p._id}>
                <td className="table__td font-bold text-lg text-center">
                  {index + 1}
                </td>
                <td className="table__td  whitespace-nowrap truncate">
                  <Image
                    src={p.images}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center font-semibold">
                  {p.name}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  $ {p.price.toFixed(2)}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  <span className="text-white text-xs bg-red-500 rounded-full px-1">
                    % {p.discount}
                  </span>
                  <p className="mt-1">$ {p.offPrice.toFixed(2)}</p>
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  <span className="text-white text-xs bg-primary-200 rounded-full p-1">
                    {p.category.name}
                  </span>
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center font-semibold">
                  {p.stock}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {toLoacalDate(p.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
