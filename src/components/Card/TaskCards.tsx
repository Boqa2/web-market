import { useState } from "react";
import StarRating from "./Start";
type props = {
  card: string;
  title: string;
  price: number | string;
  text: string;
  mesto: string;
  sostav: string;
};

const TaskCard = ({ card, title, price, text, mesto, sostav }: props) => {
  const [chenge, setChenge] = useState(false);
  const [chenge1, setChenge1] = useState(false);
  const [chenge2, setChenge2] = useState(false);
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
    <div className="flex  px-10 gap-5 w-full">
      <div className="w-full flex gap-6">
        <div className="shadow-2xl w-1/2">
          <img className="w-full rounded-md" src={card} alt="" />
        </div>
        <div className="w-1/2 space-y-5">
          <div>
            <StarRating totalStars={5} />
          </div>
          <div>
            <p className="text-xl font-semibold">{title}</p>
          </div>
          <div>
            <p className="text-4xl font-semibold">{price}</p>
          </div>
          <div className="space-y-2 ">
            <p className="text-lg">Размер</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-lg bg-slate-300">S</button>
              <button className="w-10 h-10 rounded-lg bg-slate-300">M</button>
              <button className="w-10 h-10 rounded-lg bg-slate-300">L</button>
              <button className="w-10 h-10 rounded-lg bg-slate-300">XL</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#f64c4c] px-32 h-14 rounded-lg text-lg text-white font-semibold">
              В корзину
            </button>
            <button className="bg-slate-300 px-5 h-14 rounded-lg text-xl font-semibold">
              <i className="bx bx-heart"></i>
            </button>
          </div>
          <div className="px-4">
            <div className="border  border-slate-400"></div>
          </div>
          <div>
            <div className="px-5 font-sans">
              <div className="border-b border-slate-400  w-full">
                <div className="flex py-1 mb-1  justify-between">
                  <p className="text-2xl font-medium">Описания</p>
                  <button onClick={handleClick}>
                    <i
                      className={`bx text-3xl bx-chevron-${chenge ? "up" : "down"}`}
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
                      className={`bx text-3xl bx-chevron-${chenge1 ? "up" : "down"}`}
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
                      className={`bx text-3xl bx-chevron-${chenge2 ? "up" : "down"}`}
                    ></i>
                  </button>
                </div>
                {chenge2 && (
                  <div>
                    <p>Отзывов еще никто не оставлял</p>
                    <button>
                      Оставить Отзыв
                    </button>
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
