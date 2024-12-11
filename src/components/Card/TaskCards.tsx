import { useState } from "react";
import StarRating from "./Start";
import { useNotification } from "../Libs/Notification";
type props = {
  id?: number;
  card: string;
  handleSizeS: () => void;
  handleSizeL: () => void;
  handleSizeM: () => void;
  handleSizeXl: () => void;
  title: string;
  handleHearts:()=>void,
  price: number | string;
  text?: string;
  mesto?: string;
  sostav?: string;
  size?: string;
  favoritess: ()=>void,
  hearts?:boolean;
  trash?: boolean
};

const TaskCard = ({
  card,
  title,
  price,
  text,
  hearts,
  mesto,
  sostav,
  trash,
  handleSizeS,
  handleSizeL,
  handleSizeXl,
  handleSizeM,
  favoritess,
  handleHearts,
}: props) => {
  const [chenge, setChenge] = useState(false);
  const [chenge1, setChenge1] = useState(false);
  const [chenge2, setChenge2] = useState(false);
  const {lengths, setLenghts, sizes} =useNotification()

  const handleClick = () => {
    if (!chenge) {
      setChenge(true);
    } else {
      setChenge(false);
    }
  };
  const handleClick1 = () => {
    if (!chenge1) {
      setChenge1(true);
    } else {
      setChenge1(false);
    }
  };
  const handleClick2 = () => {
    if (!chenge2) {
      setChenge2(true);
    } else {
      setChenge2(false);
    }
  };
  return (
    <div className="flex  items-center md:items-baseline px-10 gap-5 w-full">
      <div className="w-full flex-col md:flex-row flex gap-6">
        <div className="shadow-2xl md:w-1/2 w-full">
          <img className="w-full rounded-md" src={card} alt="" />
        </div>
        <div className="md:w-1/2 w-full space-y-5">
          <div>
            <StarRating totalStars={5} />
          </div>
          <div>
            <p className="text-xl font-semibold">{title}</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">{price} $</p>
          </div>
          <div className="space-y-2 ">
            <p className="text-lg">Размер</p>
            <div className="flex gap-3">
              <button
                onClick={handleSizeS}
                className={` ${sizes === "s" ? "border-2" : ""} border-yellow-400 w-10 h-10 rounded-lg bg-slate-300`}
              >
                S
              </button>
              <button
                onClick={handleSizeM}
                className={` ${sizes === "m" ? "border-2" : ""} border-yellow-400 w-10 h-10 rounded-lg bg-slate-300`}
              >
                M{" "}
              </button>
              <button
                onClick={handleSizeL}
                className={` ${sizes === "l" ? "border-2" : ""} border-yellow-400 w-10 h-10 rounded-lg bg-slate-300`}
              >
                l{" "}
              </button>
              <button
                onClick={handleSizeXl}
                className={` ${sizes === "xl" ? "border-2" : ""} border-yellow-400 w-10 h-10 rounded-lg bg-slate-300`}
              >
                Xl{" "}
              </button>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            {trash   ? (
              <button
                onClick={favoritess}
                className="bg-[#f64c4c] w-2/3 h-14 rounded-lg text-lg text-white font-semibold"
              >
                В корзину
              </button>
            ) : (
              <div className="w-2/3 flex items-center h-14 text-lg text-white font-semibold">
                <button onClick={()=>setLenghts(lengths-1)} className="h-full rounded-l-lg bg-slate-500 w-1/5">
                  -1
                </button>
                <div className="w-2/3 bg-gray-400 h-14 flex items-center justify-center">
                  {lengths}
                </div>
                <button onClick={()=>setLenghts(lengths+1)}  className="h-full rounded-r-lg bg-slate-500 w-1/5">
                  +1
                </button>
              </div>
            )}
            <button onClick={handleHearts} className={`${!hearts ? "bg-slate-300" : "bg-[#f64c4c]"}  px-5 h-14 rounded-lg text-xl font-semibold`}>
              <i className={`bx ${hearts ? "text-white" : "text-black"} ${!hearts ? "bx" : "bxs"}-heart`}></i>
            </button>
          </div>
          <div className="px-4">
            <div className="border  border-slate-400"></div>
          </div>
          <div>
            <div className="px-5 font-sans">
              <div className="border-b border-slate-400  w-full">
                <div className="flex  mb-4  justify-between">
                  <p className="text-2xl font-medium">Описания</p>
                  <button onClick={handleClick}>
                    <i
                      className={`bx text-3xl bx-chevron-${
                        chenge ? "up" : "down"
                      }`}
                    ></i>
                  </button>
                </div>
                {chenge && (
                  <div>
                    <p className="text-lg mb-3">{text}</p>
                  </div>
                )}
              </div>
              <div className="border-b border-slate-400  w-full py-2 flex flex-col">
                <div className="flex py-2 w-full justify-between">
                  <p className="text-2xl font-medium">Характеристика</p>
                  <button onClick={handleClick1}>
                    <i
                      className={`bx text-3xl bx-chevron-${
                        chenge1 ? "up" : "down"
                      }`}
                    ></i>
                    {/* chenge ? "up" : "dowm" */}
                  </button>
                </div>
                {chenge1 && (
                  <div className=" flex w-full justify-around my-3">
                    <div>
                      <p className="text-xl font-semibold">Страна</p>
                      <p>{mesto}</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">Состав</p>
                      <p>{sostav}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b border-slate-400 py-2 w-full ">
                <div className="flex py-2 justify-between">
                  <p className="text-2xl font-medium">Отзывы</p>
                  <button onClick={handleClick2}>
                    <i
                      className={`bx text-3xl bx-chevron-${
                        chenge2 ? "up" : "down"
                      }`}
                    ></i>
                  </button>
                </div>
                {chenge2 && (
                  <div>
                    <p>Отзывов еще никто не оставлял</p>
                    <button>Оставить Отзыв</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
