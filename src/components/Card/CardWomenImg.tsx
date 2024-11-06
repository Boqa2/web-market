import React, { useState } from "react";
import TaskForCard from "./TaskForCard";
import toast from "react-hot-toast";
import { useGetwomencardQuery, useUpdatecardMutation } from "../api/apiGetAll";

export type CardSliderData = {
  id: number;
  handleHeart?: () => void;
  hearts?: boolean;
  card: string;
  title: string;
  price: number | string;
  about: {
    text: string;
    sostav: string;
    mesto: string;
  };
};

const CardWomenImg = () => {
  const { data, isLoading, error } = useGetwomencardQuery();
  const [updateCard] = useUpdatecardMutation();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});

  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id] || false;
    console.log(`Current status of ${id}:`, currentStatus);
    try {
      const response = await updateCard({ id, body: { hearts: !currentStatus } }).unwrap();
      console.log("Update response:", response);
      setHearts({ ...hearts, [id]: !currentStatus });
      toast.success(`Task ${!currentStatus ? "added to" : "removed from"} favorites`, { position: "top-right" });
    } catch (error) {
      console.error("Failed to update heart status:", error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-10 px-9">
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error loading data</>
      ) : data && data.length > 0 ? (
        data.map((task: CardSliderData) => (
          <TaskForCard
            key={task.id}
            id={task.id}
            title={task.title}
            card={task.card}
            price={task.price}
            about={task.about}
            hearts={hearts[task.id] !== undefined ? hearts[task.id] : task.hearts}
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
