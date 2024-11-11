import { useState } from "react";
import TaskForCard from "../Card/TaskForCard";
import {
  useGetallcardQuery,
  useGetwomencardQuery,
  useUpdatecardMutation,
  useUpdatemencardMutation,
} from "../api/apiGetAll";
import { useNotification } from "../Libs/Notification";
import toast from "react-hot-toast";

const FavoritesPage = () => {
  const {
    data: Cardmen,
    isLoading: Cardloadmen,
    error: Carderrmen,
  } = useGetallcardQuery();
  const {
    data: Cardwomen,
    isLoading: Cardloadwomen,
    error: Carderrwomen,
  } = useGetwomencardQuery();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const [cardwomen] = useUpdatecardMutation();
  const [cardmen] = useUpdatemencardMutation();
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  const { notificationCount, setNotificationCount, url, korzina, setKorzina } =
    useNotification();
  const updateCard = url ? cardwomen : cardmen;

  const handleHeartChange = async (id: number) => {
    // console.log(`Current status of ${id}:`, currentStatus);
    try {
      await updateCard({
        id,
        body: { hearts: false },
      }).unwrap();
      // console.log("Update response:", response);
      setHearts({ ...hearts, [id]: false });
      if (hearts) {
        setNotificationCount(notificationCount - 1);
      }
      toast.success("Task removed favorites", { position: "top-right" });
    } catch (error) {
      console.error("Failed to update heart status:", error);
    }
  };
  const favorites = async (id: number) => {
    try {
      await updateCard({ id, body: { trash: false } });
      setFavorite({ ...favorite, [id]: false });
      setKorzina(korzina - 1);

      toast.success(`Task removed trash`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="px-10">
      <div>
        <div>
          <h1 className="text-2xl font-medium">Избранное</h1>
        </div>
        <div className="grid grid-cols-4 gap-10 px-2">
          {Cardloadmen ? (
            <>Loading</>
          ) : Carderrmen ? (
            <>Fetch loading error</>
          ) : Cardmen ? (
            Cardmen.filter((task) => task.hearts === true).map((tasks) => (
              <TaskForCard
                trash={
                  favorite[tasks.id] !== undefined
                    ? favorite[tasks.id]
                    : tasks.trash
                }
                handleFavorite={()=>favorites(tasks.id)}
                handleHeart={() => handleHeartChange(tasks.id)}
                hearts={
                  hearts[tasks.id] !== undefined
                    ? hearts[tasks.id]
                    : tasks.hearts
                }
                id={tasks.id}
                key={tasks.id}
                title={tasks.title}
                card={tasks.card}
                price={tasks.price}
                about={tasks.about}
              />
            ))
          ) : (
            <></>
          )}
          {Cardloadwomen ? (
            <>Loading</>
          ) : Carderrwomen ? (
            <>Fetch loading error</>
          ) : Cardwomen ? (
            Cardwomen.filter((task) => task.hearts === true).map((tasks) => (
              <TaskForCard
                trash={
                  favorite[tasks.id] !== undefined
                    ? favorite[tasks.id]
                    : tasks.trash
                }
                handleFavorite={()=>favorites(tasks.id)}
                handleHeart={() => handleHeartChange(tasks.id)}
                hearts={
                  hearts[tasks.id] !== undefined
                    ? hearts[tasks.id]
                    : tasks.hearts
                }
                id={tasks.id}
                key={tasks.id}
                title={tasks.title}
                card={tasks.card}
                price={tasks.price}
                about={tasks.about}
              />
            ))
          ) : (
            <>Fetch error data</>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
