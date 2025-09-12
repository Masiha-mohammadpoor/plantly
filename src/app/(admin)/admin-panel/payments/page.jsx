import Loading from "@/components/Loading";
import PaymentsTable from "../PaymentsTable";
import { Suspense } from "react";

const Payments = () => {
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Payments</h2>
      <Suspense fallback={<Loading />}>
        <PaymentsTable />
      </Suspense>
    </section>
  );
};

export default Payments;
