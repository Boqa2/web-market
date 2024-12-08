import { HashLoader } from "react-spinners";
import { useGetallcardQuery } from "../api/apiGetAll";
import TasksOrderCard from "./TasksOrderCard";
import { CardSliderData } from "../Libs/type/types";
import { useNotification } from "../Libs/Notification";

const TaskOrder = () => {
  const { data: Cardmen, isLoading, error } = useGetallcardQuery()
  const { orders } =useNotification()

  // Функция для вычисления общей суммы
  const calculateTotalPrice = (items: CardSliderData[]) => {
    return items
      .filter((task) => task.trash === true) // Фильтруем только те элементы, у которых trash === true
      .reduce((total, task) => total + (task.price || 0), 0); // Суммируем цену
  };
  const calcMen = Cardmen ? calculateTotalPrice(Cardmen) : 0;


  return (
    <div className="">
      <div>
        <div className="space-y-3">
          {isLoading ? (
            <div className="grid place-items-center">
              <HashLoader loading={true} size={50} />
            </div>
          ) : error ? (
            <p>console.error(error)</p>
          ) : (
            Cardmen &&
            Cardmen.filter((task)=> task.trash===true).map((tasks) => (
              <TasksOrderCard

                card={tasks.card}
                title={tasks.title}
                id={tasks.id}
                key={tasks.id}
                price={tasks.price}
                about={tasks.about}
                trash={tasks.trash}
              />
            ))
          )}
        </div>
        <div>
          <div className="flex  items-center justify-between">
            <p>Сумма по товарам:</p>
            <span className="text-xl">{calcMen} $</span>
          </div>
          <div className="flex justify-between">
            <p>Стоимость доставки:</p>
            <span className="text-xl">{orders} $</span>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-400"></div>
        <div className="flex text-xl  justify-between">
          <p>Итоги:</p>
          <span >
            {calcMen + orders} $
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskOrder;
