import { useState } from "react";
import { useGetallcardQuery } from "../api/apiGetAll";
import { useNotification } from "../Libs/Notification";
import supabase from "../Libs/supabase/subpabase";
import { CardSliderData } from "../Libs/type/types";
import TaskForCard from "./TaskForCard";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AuthState } from "../../app/rtqStore";
import { Link } from "react-router-dom";

const CardMenImg = () => {
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  const { url, setKorzina, notificationCount, setNotificationCount, korzina } =
    useNotification();
  const { data, isLoading } = useGetallcardQuery();
  const user = useSelector((state: { auth: AuthState }) => state.auth.user?.id);
  const role = useSelector(
    (state: { auth: AuthState }) => state.auth.user?.role
  );
  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id];
    try {
      await supabase
        .from("myRequest")
        .update({ hearts: !currentStatus, user_id: user })
        .eq("id", id);

      toast.success(
        `Task ${!currentStatus ? "add to" : "delet from"} favorite`
      );
      if (!currentStatus) {
        setNotificationCount(notificationCount + 1);
      } else {
        setNotificationCount(notificationCount - 1);
      }
      setHearts({ ...hearts, [id]: !currentStatus });

      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  const favorites = async (id: number) => {
    const currentStatus = favorite[id];
    try {
      await supabase
        .from("myRequest")
        .update({ trash: !currentStatus, user_id: user })
        .eq("id", id); // Выбираем только нужные поля

      toast.success(`Task ${!currentStatus ? "add to" : "delet from"} cart`);
      if (!currentStatus) {
        setKorzina(korzina + 1);
      } else {
        setKorzina(korzina - 1);
      }
      setFavorite({ ...favorite, [id]: !currentStatus });
    } catch (error) {
      console.log(error);
    }
  };
  const deletedItem = async (id: number) => {
    const { error } = await supabase
      .from("myRequest")
      .delete()
      .eq("id", id); 
    if (error) {
      console.error("Ошибка при удалении:", error.message);
    } else {
      toast.success(`Запись с id ${id} успешно удалена`)
      console.log(`Запись с id ${id} успешно удалена`);
    }
  };

  return (
    <>
      <div className="grid relative xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5 px-2 md:px-9">
        {isLoading ? (
          <div className="grid place-items-center">
            <HashLoader loading={true} size={50} />
          </div>
        ) : data && data.length > 0 ? (
          data
            .filter((task) => task.gender === url)
            .map((task: CardSliderData) => (
              <TaskForCard
              handleDelete={()=>deletedItem(task.id)}
                handleHeart={() => handleHeartChange(task.id)}
                hearts={
                  hearts[task.id] !== undefined
                    ? hearts[task.id]
                    : task.hearts && task.user_id === user
                }
                trash={
                  favorite[task.id] !== undefined
                    ? favorite[task.id]
                    : task.trash && task.user_id === user
                }
                handleFavorite={() => favorites(task.id)}
                id={task.id}
                key={task.id}
                title={task.title}
                card={task.card}
                price={task.price}
                about={task.about}
              />
            ))
        ) : (
          <>don't have any data</>
        )}
      </div>
        {isLoading ? (
          <></>
        ) : role === "admin" ? (
          <div className="flex justify-center w-full md:px-10 px-2 md:mt-10 mt-4 items-center">
            <Link
              to={"/newproduct"}
              className="border px-3 w-full font-semibold hover:bg-green-400 py-2 rounded-lg text-white text-center bg-green-600"
            >
              Добавить продукт
            </Link>
          </div>
        ) : (
          ""
        )}
    </>
  );
};

export default CardMenImg;
