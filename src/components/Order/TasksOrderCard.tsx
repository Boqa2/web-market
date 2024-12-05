import { CardSliderData } from "../Libs/type/types";

const TasksOrderCard = ({ card, title, price }: CardSliderData) => {
  return (
    <div className="w-full h-full rounded-lg shadow-md p-2">
      <div className="flex h-full items-center">
        <div className="flex h-full gap-3">
          <img className="rounded-lg object-contain h-[10%] w-[20%]" src={card} alt="" />
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
