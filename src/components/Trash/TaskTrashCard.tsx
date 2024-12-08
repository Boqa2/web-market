import { useState } from "react";
import { CardSliderData } from "../Libs/type/types";

const TaskTrashCard = ({
  title,
  card,
  size,
  price,
  handleFavorite,
  handleHeart,
  trash,
  hearts,
}: CardSliderData) => {
  const [prices, setPrices] = useState<number>(price);
  const [lengths, setLengths] = useState(1);
  return (
    <div className=" rounded-lg  p-4 w-full shadow-md">
      <div className="flex flex-col w-full md:flex-row  gap-5">
        <div className="md:w-1/5 w-full items-start">
          <img className="rounded-lg w-full" src={card} alt="" />
        </div>
        <div className="flex w-full  justify-between">
          <div>
            <p className="text-xl font-normal">{title}</p>
            <p>Размер: {size}</p>
            <div>
              <p>{price} $</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex h-7 text-xl items-center bg-slate-300 rounded-lg">
              <button
                onClick={() => {
                  setPrices(price + prices);
                  setLengths(lengths + 1);
                }}
                className="w-9 h-full font-medium rounded-l-lg"
              >
                +
              </button>
              <div className="px-3">{lengths}</div>
              <button
                onClick={() => {
                  setPrices(prices - price);
                  setLengths(lengths - 1);
                }}
                className="w-9 h-full font-medium rounded-r-lg"
              >
                -
              </button>
            </div>
            <div>{prices} $</div>
            <div className="flex flex-col gap-3">
              <button onClick={handleHeart}>
                <i
                  className={`bx ${hearts ? "text-red-500" : ""} bx-heart`}
                ></i>
              </button>
              <button onClick={handleFavorite}>
                <i className={`bx bxs-${trash ? "trash" : "trash-alt"}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTrashCard;
