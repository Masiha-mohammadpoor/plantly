import UsersTable from "./UsersTable";

const Users = () => {
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Users</h2>
      <UsersTable/>
    </section>
  );
};

export default Users;
