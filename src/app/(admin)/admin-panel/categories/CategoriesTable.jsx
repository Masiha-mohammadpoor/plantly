"use client";
import Loading from "@/components/Loading";
import { toLoacalDate } from "@/utils/localDate";
import { useGetAllCategories } from "@/hooks/useCategories";
import { categoriesTable } from "@/constants/categoriesTable";

const CategoriesTable = () => {
  const { categories, categoriesLoading } = useGetAllCategories();

  if (categoriesLoading) return <Loading />;
  return (
    <div className="overflow-auto my-10">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {categoriesTable.map((c) => {
              return (
                <th
                  key={c.id}
                  className="whitespace-nowrap table__th text-center"
                >
                  {c.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {categories?.data.map((c, index) => {
            return (
              <tr key={c._id}>
                <td className="table__td font-bold text-lg text-center">
                  {index + 1}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center font-semibold">
                  {c.name}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {c.englishTitle}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {toLoacalDate(c.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
