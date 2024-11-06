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
    slidesToShow: 5, // Базовое количество слайдов
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // Экран <= 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Экран <= 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Экран <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-8 container w-full md:h-full h-[1000px] ">
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
