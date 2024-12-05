import TaskCard from "./TaskCards";
import { useGetcardQuery, useUpdatemencardMutation } from "../api/apiGetAll";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNotification } from "../Libs/Notification";
import { HashLoader } from "react-spinners";

const CardAboutMen = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetcardQuery(id!);
  const [chengeSize] = useUpdatemencardMutation();
  const { notificationCount, setNotificationCount, setSizes } =
    useNotification();
  const [heart, setHearts] = useState<{ [id: number]: boolean }>({});

  const sizeS = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "s" } }).unwrap();
      setSizes("s");
      toast.success(`You chosen size S`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeL = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "l" } }).unwrap();
      toast.success(`You chosen size L`);
      setSizes("l");
    } catch (error) {
      console.error(error);
    }
  };
  const sizeM = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "m" } }).unwrap();
      toast.success(`You chosen size M`);
      setSizes("m");
    } catch (error) {
      console.error(error);
    }
  };
  const sizeXl = async (id: number) => {
    try {
      await chengeSize({ id, body: { size: "xl" } }).unwrap();
      toast.success(`You chosen size Xl`);
      setSizes("xl");
    } catch (error) {
      console.error(error);
    }
  };
  const chengeHearts = async (id: number) => {
    const currentStatus = heart[id] || false;
    try {
      await chengeSize({
        id,
        body: { hearts: !currentStatus },
      }).unwrap();
      // console.log("Update response:", response);
      setHearts({ ...heart, [id]: !currentStatus });
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
        <div className="grid place-items-center">
          <HashLoader loading={true} size={50} />
        </div>
      ) : error ? (
        <>Failed to fetch</>
      ) : data ? (
        <TaskCard
          handleHearts={() => chengeHearts(data.id)}
          hearts={heart[data.id] !== undefined ? heart[data.id] : data.hearts}
          handleSizeS={() => sizeS(data.id)}
          handleSizeL={() => sizeL(data.id)}
          handleSizeM={() => sizeM(data.id)}
          handleSizeXl={() => sizeXl(data.id)}
          text={data.about.text}
          sostav={data.about.sostav || "No composition info"}
          mesto={data.about.mesto || "No place info"}
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

export default CardAboutMen;
