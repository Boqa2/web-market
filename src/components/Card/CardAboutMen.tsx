import TaskCard from "./TaskCards";
import { useCardQuery } from "../api/apiGetAll";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import supabase from "../Libs/supabase/subpabase";
import toast from "react-hot-toast";
import { useNotification } from "../Libs/Notification";

const CardAboutMen = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useCardQuery(Number(id));
  const { notificationCount, setNotificationCount, setSizes } =
    useNotification();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});

  const sizeS = async (id: number) => {
    try {
      await supabase.from("myRequest").update({ size: "S" }).eq("id", id);
      setSizes("s");
      toast.success(`You chosen size S`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeL = async (id: number) => {
    try {
      await supabase.from("myRequest").update({ size: "L" }).eq("id", id);
      setSizes("l");
      toast.success(`You chosen size L`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeM = async (id: number) => {
    try {
      await supabase.from("myRequest").update({ size: "M" }).eq("id", id);
      setSizes("m");
      toast.success(`You chosen size M`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeXl = async (id: number) => {
    try {
      await supabase.from("myRequest").update({ size: "XL" }).eq("id", id);
      setSizes("xl");
      toast.success(`You chosen size XL`);
    } catch (error) {
      console.error(error);
    }
  };
  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id];
    try {
      await supabase
        .from("myRequest")
        .update({ hearts: !currentStatus })
        .eq("id", id);

        toast.success(`Task ${!currentStatus ? "add to" : "delet from"} favorite`)
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
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid place-items-center">
          <HashLoader loading={true} size={50} />
        </div>
      ) : error ? (
        <>Failed to fetch</>
      ) : data && data ? (
        <TaskCard
          handleHearts={() => handleHeartChange(data.id)}
          hearts={hearts[data.id] !== undefined ? hearts[data.id] : data.hearts}
          text={data.about.text}
          sostav={data.about.sostav || "No composition info"}
          mesto={data.about.mesto || "No place info"}
          title={data.title}
          card={data.card}
          key={data.id}
          price={data.price}
          handleSizeL={() => sizeL(data.id)}
          handleSizeM={() => sizeM(data.id)}
          handleSizeXl={() => sizeXl(data.id)}
          handleSizeS={() => sizeS(data.id)}
        />
      ) : (
        <>No data available</>
      )}
    </div>
  );
};

export default CardAboutMen;
