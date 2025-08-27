import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import CategoriesTable from "./CategoriesTable";

const Categories = () => {
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Link href="/admin-panel/categories/create">
          <button className="flex items-center gap-x-2 text-white bg-primary-200 rounded-lg px-2 py-1 cursor-pointer">
            <FaPlus /> Add Category
          </button>
        </Link>
      </div>
      <CategoriesTable />
    </section>
  );
};

export default Categories;
