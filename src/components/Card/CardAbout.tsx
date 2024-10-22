import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardSliderData } from "./CardImg";
import axios from "axios";
import Logo from "../Libs/urls";



const CardAbout = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<CardSliderData | null>(null); // Изменим на одиночный объект
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${Logo.urlTask}/${url ? "card4women" : "cardimgs" }/${id}`)
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
        <div>
          <p>Price: {data.price}</p>
          {/* Добавь сюда остальные поля, которые нужны */}
        </div>
      ) : (
        <>No data available</>
      )}
    </div>
  );
};

export default CardAbout
