import { useEffect, useState } from "react";
import TaskForCard from "../Card/TaskForCard";
import { CardSliderData } from "../Card/CardWomenImg";
import axios from "axios";
import Logo from "../Libs/urls";

const FavoritesPage = () => {
  const [data, setData] = useState<CardSliderData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data1, setData1] = useState<CardSliderData[] | null>(null);
  useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get(`${Logo.urlTask}/card4women`)
        .then((res) => setData(res.data))
        .catch((error) => setError(error));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(true);
    try {
      axios.get(`${Logo.urlTask}/cardimg`).then((res) => setData1(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="px-10">
      <div>
        <div>
          <h1 className="text-2xl font-medium">Избранное</h1>
        </div>
        <div className="grid grid-cols-4 gap-10 px-2">
          {isLoading ? (
            <>Loading</>
          ) : error ? (
            <>{error}</>
          ) : data ? (
            data
              .filter((task) => task.hearts === true)
              .map((tasks) => (
                <TaskForCard
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
          {isLoading ? (
            <>Loading</>
          ) : error ? (
            <>{error}</>
          ) : data1 ? (
            data1
              .filter((task) => task.hearts === true)
              .map((tasks) => (
                <TaskForCard
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
