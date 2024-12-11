import TaskCard from "./TaskCards";
import { useCardQuery } from "../api/apiGetAll";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import supabase from "../Libs/supabase/subpabase";
import toast from "react-hot-toast";
import { useNotification } from "../Libs/Notification";
import { useSelector } from "react-redux";
import { AuthState } from "../../app/rtqStore";

const CardAboutMen = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useCardQuery(Number(id));
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  const {
    notificationCount,
    setNotificationCount,
    korzina,
    setKorzina,
    setSizes,
  } = useNotification();
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const user = useSelector((state: { auth: AuthState }) => state.auth.user?.id);

  const sizeS = async (id: number) => {
    try {
      await supabase
        .from("myRequest")
        .update({ size: "S", user_id: user })
        .eq("id", id);
      setSizes("s");
      toast.success(`You chosen size S`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeL = async (id: number) => {
    try {
      await supabase
        .from("myRequest")
        .update({ size: "L", user_id: user })
        .eq("id", id);
      setSizes("l");
      toast.success(`You chosen size L`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeM = async (id: number) => {
    try {
      await supabase
        .from("myRequest")
        .update({ size: "M", user_id: user })
        .eq("id", id);
      setSizes("m");
      toast.success(`You chosen size M`);
    } catch (error) {
      console.error(error);
    }
  };
  const sizeXl = async (id: number) => {
    try {
      await supabase
        .from("myRequest")
        .update({ size: "XL", user_id: user })
        .eq("id", id);
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
          favoritess={() => favorites(data.id)}
          handleHearts={() => handleHeartChange(data.id)}
          hearts={hearts[data.id] !== undefined ? hearts[data.id] : data.hearts}
          text={data.about.text}
          sostav={data.about.sostav || "No composition info"}
          mesto={data.about.mesto || "No place info"}
          title={data.title}
          trash={
            favorite[data.id] !== undefined
              ? favorite[data.id]
              : data.trash && data.user_id === user
          }
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
