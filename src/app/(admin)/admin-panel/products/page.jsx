"use client";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ProductsTable from "./ProductsTable";
import { useDeleteProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Products = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteProduct();

  const deleteHandler = async (id) => {
    try {
      const data = await mutateAsync(id);
      toast.success("Product successfully deleted !!!");
      queryClient.invalidateQueries(["get-products"]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <Link href="/admin-panel/products/create">
          <button className="flex items-center gap-x-2 text-white bg-primary-200 rounded-lg px-2 py-1 cursor-pointer">
            <FaPlus /> Add Product
          </button>
        </Link>
      </div>
      <ProductsTable onDelete={deleteHandler} />
    </section>
  );
};

export default Products;
