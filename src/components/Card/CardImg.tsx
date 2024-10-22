import axios from "axios";
import { useEffect, useState } from "react";
import Logo from "../Libs/urls";
import TaskForCard from "./TaskForCard";

export  type CardSliderData = {
  id: number;
  card: string;
  title: string,
  price:number | string
  url?: boolean
};
type  prop ={
  url: boolean,
}
const CardImg = ({url}:prop) => {
  const [data, setData] = useState<CardSliderData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${Logo.urlTask}/${url ? `card4women` : `cardimgs`}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [url]);
  // const handleHeart =(id:number)=>{
  //   if(heart(id)){
  //     setHeart(true)
  //   }else{
  //     setHeart(false)
  //   }
  // }
  // const handleHeart = (id: number) => {
  //   setHeart((prevState) => ({...prevState, [id]: !prevState[id] ?? true, }));
  // };
  return (
    <div className="grid grid-cols-4 gap-10 px-9">
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>{error}</>
      ) : data && data.length > 0 ? (
        data.map((task) => (
          <TaskForCard url={url} id={task.id} key={task.id} title={task.title} card={task.card} price={task.price} />
        ))
      ) : (
        <>No data available</>
      )}
    </div>
  );
};

export default CardImg;
