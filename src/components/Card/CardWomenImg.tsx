import React, { useState } from "react";
import TaskForCard from "./TaskForCard";
import toast from "react-hot-toast";
import { useGetwomencardQuery, useUpdatecardMutation } from "../api/apiGetAll";
import { useNotification } from "../Libs/Notification";
import { HashLoader } from "react-spinners";

export type CardSliderData = {
  id: number;
  handleHeart?: () => void;
  hearts?: boolean;
  card: string;
  title: string;
  handleFavorite?: () => void;
  price: number,
  about: {
    text: string;
    sostav: string;
    mesto: string;
  };
  size?: string;
  trash: boolean;
};

const CardWomenImg = () => {
  const { data, isLoading, error } = useGetwomencardQuery();
  const [updateCard] = useUpdatecardMutation();
  const {notificationCount, setNotificationCount } = useNotification();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const {korzina, setKorzina } = useNotification();
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});

  const favorites = async (id: number) => {
    const currentFavorite = favorite[id] || false;
    try {
      await updateCard({ id, body: { trash: currentFavorite } });
      setFavorite({ ...favorite, [id]: !currentFavorite });
      setKorzina(1);
      if(!currentFavorite){
        setKorzina(korzina+1)
      }else{
        setKorzina(korzina-1)
      }      
      toast.success(
        `Task ${currentFavorite ? "added to" : "deleted from"} trash`
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id] || false;
    // console.log(`Current status of ${id}:`, currentStatus);
    try {
      await updateCard({
        id,
        body: { hearts: !currentStatus },
      }).unwrap();
      // console.log("Update response:", response);
      setHearts({ ...hearts, [id]: !currentStatus });
      if(!currentStatus){
        setNotificationCount(notificationCount+1)
      }else{
        setNotificationCount(notificationCount-1)
      }
      toast.success(
        `Task ${!currentStatus ? "added to" : "removed from"} favorites`,
        { position: "top-right" }
      );
    } catch (error) {
      console.error("Failed to update heart status:", error);
    }
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-10 px-10">
      {isLoading ? (
         <div className="grid place-items-center">
         <HashLoader   loading={true} size={50} />
     </div>
      ) : error ? (
        <>Error loading data</>
      ) : data && data.length > 0 ? (
        data.map((task: CardSliderData) => (
          <TaskForCard
            handleFavorite={() => favorites(task.id)}
            trash={
              favorite[task.id] !== undefined ? favorite[task.id] : task.trash
            }
            key={task.id}
            id={task.id}
            title={task.title}
            card={task.card}
            price={task.price}
            about={task.about}
            hearts={
              hearts[task.id] !== undefined ? hearts[task.id] : task.hearts
            }
            handleHeart={() => handleHeartChange(task.id)}
          />
        ))
      ) : (
        <>No data available</>
      )}
    </div>
  );
};

export default CardWomenImg;
