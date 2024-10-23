import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardSliderData } from "./CardImg";
import axios from "axios";
import Logo from "../Libs/urls";
import TaskCard from "./TaskCards";

const CardAboutWomen = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<CardSliderData | null>(null); // Изменим на одиночный объект
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chenge, setChenge] = useState(false);
  const [chenge1, setChenge1] = useState(true);
  const [chenge2, setChenge2] = useState(true);

  useEffect(() => {
    axios
      .get(`${Logo.urlTask}/card4women/${id}`)
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
          handleClick={() => setChenge(false)}
          handleClick1={() => setChenge1(true)}
          handleClick2={() => setChenge2(true)}
          chenge={chenge}
          chenge1={chenge1}
          chenge2={chenge2}
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
