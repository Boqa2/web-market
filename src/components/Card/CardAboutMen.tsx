import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardSliderData } from "./CardWomenImg";
import axios from "axios";
import Logo from "../Libs/urls";
import TaskCard from "./TaskCards";

const CardAboutMen = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<CardSliderData | null>(null); // Изменим на одиночный объект
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${Logo.urlTask}/cardimgs/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>{error}</>
      ) : data ? (
        <TaskCard
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
