import { HashLoader } from "react-spinners";
import { useGetallcardQuery, useGetwomencardQuery } from "../api/apiGetAll";
import TasksOrderCard from "./TasksOrderCard";
import { CardSliderData } from "../Card/CardWomenImg";

const TaskOrder = () => {
  const { data: Cardmen, isLoading, error } = useGetallcardQuery();
  const { data: Cardwomen } = useGetwomencardQuery();

  // Функция для вычисления общей суммы
  const calculateTotalPrice = (items: CardSliderData[]) => {
    return items
      .filter((task) => task.trash === true) // Фильтруем только те элементы, у которых trash === true
      .reduce((total, task) => total + (task.price || 0), 0); // Суммируем цену
  };
  const calcWom = Cardwomen ? calculateTotalPrice(Cardwomen) : 0;
  const calcMen = Cardmen ? calculateTotalPrice(Cardmen) : 0;

  const calcSum = calcMen + calcWom;

  return (
    <div className="">
      <div>
        <div className="space-y-3">
          {Cardwomen &&
            Cardwomen.filter((task) => task.trash === true).map((tasks) => (
              <TasksOrderCard
                card={tasks.card}
                title={tasks.title}
                id={tasks.id}
                key={tasks.id}
                price={tasks.price}
                about={tasks.about}
                trash={tasks.trash}
              />
            ))}
          {isLoading ? (
            <div className="grid place-items-center">
              <HashLoader loading={true} size={50} />
            </div>
          ) : error ? (
            <p>console.error(error)</p>
          ) : (
            Cardmen &&
            Cardmen.filter((task) => task.trash === true).map((tasks) => (
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
            <span className="text-xl">{calcSum} $</span>
          </div>
          <div>
            <p>Стоимость доставки:</p>
            <span>Введите стоимость доставки</span>
          </div>
        </div>
        <div>
          <p>Итоги:</p>
          <span>
            {/* Общая сумма товаров + стоимость доставки */}
            {calcSum} $
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskOrder;
