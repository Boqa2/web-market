import TaskSlider from "./TaskSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSliderQuery } from "../api/apiGetAll";

const CardSlider = () => {
  const { data, isLoading, error } = useSliderQuery();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
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
    <div className="px-8 container w-full md:h-full h-auto">
      <div className="overflow-hidden ">
        <Slider {...settings}>
          {isLoading ? (
            <>Loading...</>
          ) : error ? (
            <>error</>
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
