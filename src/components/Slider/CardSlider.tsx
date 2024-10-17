import axios from "axios";
import { useEffect, useState } from "react";
import Logo from "../Libs/urls";
import TaskSlider from "./TaskSlider";
type Props ={
    id:number,
    urls: string,
}
const CardSlider = () => {
    const [data, setData] = useState<Props[] | null>(null)
  useEffect(() => {
     axios.get(`${Logo.urlTask}/cardslider`).then((res)=>{setData(res.data)}).catch(error => {console.error("Problem with axios", error)})
  }, []);
  return (
    <div className="overflow-hidden">
      <ul className="grid grid-cols-3 overflow-hidden h-full">
        {!data ? (<>Loading...</>) : (
            data.map((task) => (
                <TaskSlider tasks={task.urls} />
            ))
        ) }
      </ul>
    </div>
  );
};

export default CardSlider;
