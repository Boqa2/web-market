import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TaskForCard from "../Card/TaskForCard";
import { useGetallcardQuery, useGetwomencardQuery } from "../api/apiGetAll";
import TaskTrashCard from "../Trash/TaskTrashCard";
import { useRef, useState } from "react";
import TrashSticy from "../Trash/TrashSticy";

const TrashPage = () => {
  const { data: Cardwomen } = useGetwomencardQuery();
  const { data: Cardmen, isLoading, error } = useGetallcardQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
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
    <div className="px-10 container mx-auto">
      <h1 className="text-3xl font-semibold text-gray-700 font-mono my-7">
        Карзина
      </h1>
      <div className="flex relative gap-4">
        <div className="flex flex-col gap-5 w-3/4">
          {isLoading ? (
            <>Loading</>
          ) : error ? (
            <>Fetch loading error</>
          ) : Cardmen ? (
            Cardmen.filter((task) => task.trash === true).map((tasks) => (
              <div className="relative">
                <TaskTrashCard
                  trash={tasks.trash}
                  id={tasks.id}
                  key={tasks.id}
                  title={tasks.title}
                  card={tasks.card}
                  price={tasks.price}
                  about={tasks.about}
                />
              </div>
            ))
          ) : (
            <></>
          )}
          {isLoading ? (
            <></>
          ) : error ? (
            <>Fetch loading error</>
          ) : Cardwomen ? (
            Cardwomen.filter((task) => task.trash === true).map((tasks) => (
              <div className="relative">
                <TaskTrashCard
                  trash={tasks.trash}
                  id={tasks.id}
                  key={tasks.id}
                  title={tasks.title}
                  card={tasks.card}
                  price={tasks.price}
                  about={tasks.about}
                />
              </div>
            ))
          ) : (
            <>No found </>
          )}
        </div>
        <div className="relative w-1/4">
          <TrashSticy />
        </div>
      </div>
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
              disabled={currentIndex >= (Cardmen ? Cardmen.length - 1 : 0)}
            >
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
          <Slider ref={sliderRef} {...settings} className="flex gap-5">
            {!Cardmen ? (
              <>loading</>
            ) : (
              Cardmen.map((task) => (
                <div key={task.id} className="px-5">
                  <TaskForCard
                    trash={task.trash}
                    about={task.about}
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
