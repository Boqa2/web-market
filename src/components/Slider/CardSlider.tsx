import axios from "axios";
import { useEffect, useState } from "react";
import Logo from "../Libs/urls";
import TaskSlider from "./TaskSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CardSliderData = {
  id: number;
  urls: string;
};

const CardSlider = () => {
  const [data, setData] = useState<CardSliderData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${Logo.urlTask}/cardslider`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Problem with axios", error);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true, // Включаем перетаскивание мышкой
    swipeToSlide: true, // Включаем возможность перетаскивания слайда мышкой
  };

  return (
    <div className="px-8">
      <div className="overflow-hidden ">
        <Slider {...settings}>
          {loading ? (
            <>Loading...</>
          ) : error ? (
            <>{error}</>
          ) : data && data.length > 0 ? (
            data.map((task) => <TaskSlider key={task.id} tasks={task.urls} />)
          ) : (
            <>No data available</>
          )}
        </Slider>
      </div>

      {/* //!нужно изменить фон  */}
    </div>
  );
};

export default CardSlider;
