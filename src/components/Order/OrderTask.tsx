import { useState } from "react";
import LoginOrderPage from "./LoginOrderTask";
import TaskOrder from "./TaskOrders";

const OrderTask = () => {
  const [orders, setOrders] = useState<number>(300)
  const [notOrders, setNotOrders] = useState<number>(0)
  const [hiddens, setHiddens] =useState<boolean>(false)
  return (
    <div className="px-10">
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-medium">Oфармления заказа</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2 w-full">
          <div className="lg:order-1 order-none">
            <div className="block md:hidden">
              <button className={`px-3 ${hiddens ? "bg-red-500" :"bg-slate-400"} py-2 rounded-lg text-white`} onClick={()=>setHiddens(!hiddens)}>{hiddens ? "Показать" : "Скрыть"} товары</button>
            </div>
            <div className={`${hiddens ? "hidden" : ""} py-5`}>
              <TaskOrder  />
            </div>
          </div>
          <LoginOrderPage  orders={orders} notOrders={notOrders}  />
          
          
        </div>
      </div>
    </div>
  );
};

export default OrderTask;
