import { useState } from "react";
import { useGetallcardQuery } from "../api/apiGetAll";
import { useNotification } from "../Libs/Notification";
import supabase from "../Libs/supabase/subpabase";
import { CardSliderData } from "../Libs/type/types";
import TaskForCard from "./TaskForCard";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

const CardMenImg = () => {
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  const { url, setKorzina, notificationCount, setNotificationCount, korzina } =
    useNotification();
  const { data, isLoading } = useGetallcardQuery();

  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id];
    try {
      await supabase
        .from("myRequest")
        .update({ hearts: !currentStatus })
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
        .update({ trash: !currentStatus })
        .eq("id", id); // Выбираем только нужные поля

        toast.success(`Task ${!currentStatus ? "add to" : "delet from"} cart`)
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
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-10 px-2 md:px-9">
      {isLoading ? (
        <div className="grid place-items-center">
          <HashLoader loading={true} size={50} />
        </div>
      ) : data && data.length > 0 ? (
        data
          .filter((task) => task.gender === url)
          .map((task: CardSliderData) => (
            <TaskForCard
              handleHeart={() => handleHeartChange(task.id)}
              hearts={
                hearts[task.id] !== undefined ? hearts[task.id] : task.hearts
              }
              trash={
                favorite[task.id] !== undefined ? favorite[task.id] : task.trash
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
  );
};

export default CardMenImg;
