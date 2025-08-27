"use client";
import Loading from "@/components/Loading";
import { toLoacalDate } from "@/utils/localDate";
import { usersTable } from "@/constants/usersTable";
import { useGetAllUsers } from "@/hooks/useAuth";

const UsersTable = () => {
  const { users, usersLoading } = useGetAllUsers();

  if (usersLoading) return <Loading />;
  return (
    <div className="overflow-auto my-10">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {usersTable.map((h) => {
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
          {users?.data.map((u, index) => {
            return (
              <tr key={u._id}>
                <td className="table__td font-bold text-lg text-center">
                  {index + 1}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {u.name}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {u.email}
                </td>
                <td className="table__td  whitespace-nowrap truncate text-center">
                  {toLoacalDate(u.createdAt)}
                </td>
                <td className="table__td text-nowrap text-center">
                  <span className="px-2 py-1 rounded-full text-white bg-green-500">
                    {u.role}
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

export default UsersTable;
