import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Logo from "../Libs/urls";
import { CardSliderData } from "../Card/CardWomenImg";
import TaskForCard from "../Card/TaskForCard";

const TrashPage = () => {
  const [data, setData] = useState<CardSliderData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    axios
      .get(`${Logo.urlTask}/cardimgs`)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err);
        console.error(error);
      });
  }, []);
  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 2,
    draggable: true, // Включаем перетаскивание мышкой
    swipeToSlide: true, // Включаем возможность перетаскивания слайда мышкой
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };
  return (
    <div className="px-10">
      <h1 className="text-3xl font-semibold text-gray-700 font-mono my-7">
        Карзина
      </h1>
      <div className="my-5">Ваща корзина пуста</div>
      <div className="">
        <div className="overflow-hidden">
          <h1 className="text-3xl font-semibold text-gray-700 font-mono">
            Каталог
          </h1>
          <div className="flex justify-end px-10 py-2 disabled:text- gap-3 text-[#f05356]">
            <button
              className="text-3xl disabled:text-[#ee8f90] hover:text-[#ee8f90]"
              onClick={() => sliderRef.current?.slickPrev()}
              disabled={currentIndex === 0}
            >
              <i className="bx bx-left-arrow-alt"></i>
            </button>
            <button
              className="text-3xl disabled:text-[#ee8f90] hover:text-[#ee8f90]"
              onClick={() => sliderRef.current?.slickNext()}
              disabled={currentIndex >= (data ? data.length - 1 : 0)}
            >
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
          <Slider ref={sliderRef} {...settings} className="flex gap-5">
            {!data ? (
              <>loading</>
            ) : (
              data.map((task) => (
                <div key={task.id} className="px-5">
                  <TaskForCard
                    id={task.id}
                    title={task.title}
                    card={task.card}
                    price={task.price}
                  />
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TrashPage;
