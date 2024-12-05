import { CardSliderData } from "../Card/CardWomenImg";

const TasksOrderCard = ({ card, title, price }: CardSliderData) => {
  return (
    <div className="w-full rounded-lg p-5 border border-black ">
      <div className="flex items-center">
        <div className="flex gap-3">
          <img className="rounded-lg w-[10%]" src={card} alt="" />
          <div className="flex justify-between w-full items-center">
            <p>{title}</p>
            <p>1x{price}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksOrderCard;
