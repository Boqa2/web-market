import { useParams } from "react-router-dom";
import TaskCard from "./TaskCards";
import {
  useGetwomscardQuery,
  useUpdatecardMutation,
  useUpdatemencardMutation,
} from "../api/apiGetAll";
import { useNotification } from "../Libs/Notification";
import toast from "react-hot-toast";
import { useState } from "react";

// interface CardData {
//   id: string;
//   title: string;
//   card: string;
//   price: number;
//   about: {
//     text: string;
//     mesto: string;
//     sostav: string;
//   };
//   size?: string
// }

const CardAboutWomen = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetwomscardQuery(id);
  const { url, setNotificationCount, notificationCount, setSizes } = useNotification();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const [updateCard] = useUpdatecardMutation();
  const [updateMenCard] = useUpdatemencardMutation();

  const chengeSize = url ? updateCard : updateMenCard;

  const sizeS = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "s" } }).unwrap();
      toast.success(`You chosen size S`);
      setSizes("s")
    } catch (error) {
      console.error(error);
    }
  };
  const sizeL = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "l" } }).unwrap();
      toast.success(`You chosen size L`);
      setSizes("l")
    } catch (error) {
      console.error(error);
    }
  };
  const sizeM = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "m" } }).unwrap();
      toast.success(`You chosen size M`);
      setSizes("m")
    } catch (error) {
      console.error(error);
    }
  };
  const sizeXl = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "xl" } }).unwrap();
      toast.success(`You chosen size Xl`);
      setSizes("xl")
    } catch (error) {
      console.error(error);
    }
  };
  const chengeHearts = async (id: number) => {
    const currentStatus = hearts[id];
    // console.log(`Current status of ${id}:`, currentStatus);
    try {
      await chengeSize({
        id,
        body: { hearts: !currentStatus },
      }).unwrap();
      // console.log("Update response:", response);
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

  return (
    <div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Failed to fetch data</>
      ) : data ? (
        <TaskCard
          hearts={hearts[data.id] !== undefined ? hearts[data.id] : data.hearts}
          handleHearts={() => chengeHearts(data.id)}
          handleSizeS={() => sizeS(data.id)}
          handleSizeL={() => sizeL(data.id)}
          handleSizeM={() => sizeM(data.id)}
          handleSizeXl={() => sizeXl(data.id)}
          size={data.size}
          text={data.about.text}
          mesto={data.about.mesto}
          sostav={data.about.sostav}
          title={data.title}
          card={data.card}
          key={data.id}
          price={data.price}
        />
      ) : (
        <>No data available</>
      )}
    </div>
  );
};

export default CardAboutWomen;
