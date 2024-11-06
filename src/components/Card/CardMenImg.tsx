import toast from "react-hot-toast";
import { useGetallcardQuery, useUpdatecardMutation } from "../api/apiGetAll";
import { CardSliderData } from "./CardWomenImg";
import TaskForCard from "./TaskForCard";
import { useState } from "react";

const CardMenImg = () => {
  const { data, isLoading } = useGetallcardQuery();
  const [updateCard] = useUpdatecardMutation();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});

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
      toast.success(
        `Task ${!currentStatus ? "added to" : "removed from"} favorites`,
        { position: "top-right" }
      );
    } catch (error) {
      console.error("Failed to update heart status:", error);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-10 px-9">
      {isLoading ? (
        <>Loading...</>
      ) : data && data.length > 0 ? (
        data.map((task: CardSliderData) => (
          <TaskForCard
            handleHeart={() => handleHeartChange(task.id)}
            hearts={
              hearts[task.id] !== undefined ? hearts[task.id] : task.hearts
            }
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
