import { useState } from "react";
import { CardSliderData } from "../Card/CardWomenImg";

const TaskTrashCard = ({ title, card, size, price }: CardSliderData) => {
  const [prices, setPrices] = useState<number | string>(price)
  return (
    <div className=" rounded-lg  p-4 w-full shadow-md">
      <div className="flex w-full gap-5">
        <div className="w-1/5 ">
          <img className="rounded-lg" src={card} alt="" />
        </div>
        <div className="flex w-full justify-between">
          <div>
            <p>{title}</p>
            <p>{size}</p>
            <div>
              <p>{price}</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex h-9 text-xl items-center bg-gray-400 rounded-lg">
              <button onClick={()=>setPrices("prices" + 2)} className="w-9 h-full bg-slate-300 font-medium rounded-l-lg">+</button>
              <div className="px-3">-12</div>
              <button className="w-9 h-full bg-slate-300 font-medium rounded-r-lg">-</button>
            </div>
            <div>{prices}</div>
            <div className="flex flex-col gap-3">
              <button><i className="bx bx-heart"></i></button>
              <button><i className="bx bx-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTrashCard;
