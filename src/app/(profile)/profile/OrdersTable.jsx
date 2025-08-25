import { orderTableData } from "@/constants/orderTableData";

const OrderTable = () => {
  return (
    <div className="overflow-auto my-10">
    <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
      <thead>
        <tr>
          {orderTableData.map(h => {
            return <th key={h.id} className="whitespace-nowrap table__th text-center">{h.title}</th>
          })}
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
    </div>
  );
}
 
export default OrderTable;
