import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ProductsTable from "./ProductsTable";

const Products = () => {
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
      <ProductsTable/>
    </section>
  );
};

export default Products;
