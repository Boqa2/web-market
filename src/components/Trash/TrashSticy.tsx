import { Link } from "react-router-dom";
type props = {
  prices: number
} 
const TrashSticy = ({prices}:props) => {
  return (
    <div className="sticky top-24 w-full rounded-lg p-4 bg-slate-300">
      <div className="space-y-5 ">
        <div className="font-medium">
          <div className="flex justify-between">
            <p>Товары(0)</p>
            <p>{prices} $</p>
          </div>
          <div className="flex justify-between">
            <p>Итого</p>
            <p className="text-xl font-normal">{prices} $</p>
          </div>
        </div>
        <div>
          <Link to={"/order"} className="px-4 bg-red-600 flex w-full rounded-lg text-white py-2 font-medium items-center justify-center">Оформить заказ</Link>
        </div>
      </div>
    </div>
  );
};

export default TrashSticy;
