import toast from "react-hot-toast";
import { useGetallcardQuery, useUpdatemencardMutation } from "../api/apiGetAll";
import { CardSliderData } from "./CardWomenImg";
import TaskForCard from "./TaskForCard";
import { useState } from "react";
import { useNotification } from "../Libs/Notification";
import { HashLoader } from "react-spinners";

const CardMenImg = () => {
  const { data, isLoading } = useGetallcardQuery();
  const [updateCard] = useUpdatemencardMutation();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const { notificationCount, setNotificationCount, setKorzina, korzina } =
    useNotification();
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});

  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id] || false;
    try {
      await updateCard({
        id,
        body: { hearts: !currentStatus },
      }).unwrap();
      setHearts({ ...hearts, [id]: !currentStatus });
      if (!currentStatus) {
        setNotificationCount(notificationCount + 1);
      } else {
        setNotificationCount(notificationCount - 1);
      }
      toast.success(
        `Task ${!currentStatus ? "added to" : "removed from"} favorites`,
        { position: "bottom-right" }
      );
    } catch (error) {
      console.error("Failed to update heart status:", error);
    }
  };
  const favorites = async (id: number) => {
    const currentFavorite = favorite[id] || false;
    try {
      await updateCard({ id, body: { trash: !currentFavorite } });
      setFavorite({ ...favorite, [id]: !currentFavorite });
      setKorzina(1);
      if (!currentFavorite) {
        setKorzina(korzina + 1);
      } else {
        setKorzina(korzina - 1);
      }
      toast.success(
        `Task ${!currentFavorite ? "added to" : "deleted from"} trash`
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-5 md:px-9">
      {isLoading ? (
         <div className="grid place-items-center">
         <HashLoader   loading={true} size={50} />
     </div>
      ) : data && data.length > 0 ? (
        data.map((task: CardSliderData) => (
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
        <>No data available</>
      )}
    </div>
  );
};

export default CardMenImg;
