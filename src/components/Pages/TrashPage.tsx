import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TaskForCard from "../Card/TaskForCard";
import {
  useGetallcardQuery
} from "../api/apiGetAll";
import TaskTrashCard from "../Trash/TaskTrashCard";
import { useRef, useState } from "react";
import TrashSticy from "../Trash/TrashSticy";
// import { useNotification } from "../Libs/Notification";
// import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { CardSliderData } from "../Libs/type/types";

const TrashPage = () => {
  const { data: Cardmen, isLoading, error } = useGetallcardQuery();
  // const { data: Cardmens,  } = useGetFavoriteCardQuery({value:"katalog", gender: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  // const [heart, setHeart] = useState<{ [id: number]: boolean }>({});
  // // const [upcardmen] = useUpdatemencardMutation();
  // const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  // const { notificationCount, setNotificationCount, korzina, setKorzina } =
    // useNotification();
  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 2,
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
    draggable: true, // Включаем перетаскивание мышкой
    swipeToSlide: true, // Включаем возможность перетаскивания слайда мышкой
    beforeChange: (_current: number, next: number) => setCurrentIndex(next),
  };
  
  

  const calculateTotalPrice = (items: CardSliderData[]) => {
    return items
      .filter((task) => task.trash === true) // Фильтруем только те элементы, у которых trash === true
      .reduce((total, task) => total + (task.price || 0), 0); // Суммируем цену
  };

  const calcMen = Cardmen ? calculateTotalPrice(Cardmen) : 0;


  // const handleHeartChange = async (id: number) => {
  //   const current = heart[id] || false;
  //   try {
  //     await upcardmen({
  //       id,
  //       body: { hearts: !current },
  //     }).unwrap();
  //     setHeart({ ...heart, [id]: !current });
  //     setNotificationCount(notificationCount + 1);

  //     toast.success(`Task ${!current ? "removed" : "added"} favorites`, {
  //       position: "top-right",
  //     });
  //   } catch (error) {
  //     console.error("Failed to update heart status:", error);
  //   }
  // };
  // const favorites = async (id: number) => {
  //   try {
  //     await upcardmen({ id, body: { trash: false } });
  //     setFavorite({ ...favorite, [id]: false });
  //     setKorzina(korzina - 1);
  //     toast.error(`Task removed in trash`, { position: "top-right" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const cardlength = Cardmen ? Cardmen.length : 0
  return (
    <div className="px-10 h-full ">
      <h1 className="text-3xl font-semibold text-gray-700 font-mono my-7">
        Карзина
      </h1>
      <div className="flex w-full flex-col md:flex-row relative gap-4">
        <div className="flex flex-col gap-5 w-full md:w-3/4">
          {isLoading ? (
            ""
          ) : error ? (
            <>Fetch loading error</>
          ) : Cardmen ? (
            Cardmen.filter((task) => task.trash === true).map((tasks) => (
              <div className="relative">
                <TaskTrashCard
                
                  // handleFavorite={() => favorites(tasks.id)}
                  // handleHeart={() => handleHeartChange(tasks.id)}
                  // hearts={
                  //   heart[tasks.id] || undefined
                  //     ? heart[tasks.id]
                  //     : tasks.hearts
                  // }
                  // trash={
                  //   favorite[tasks.id] !== undefined
                  //     ? favorite[tasks.id]
                  //     : tasks.trash
                  // }
                  id={tasks.id}
                  key={tasks.id}
                  title={tasks.title}
                  card={tasks.card}
                  price={tasks.price}
                  about={tasks.about} trash={false}                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="relative w-full md:w-1/4">
          <TrashSticy lengt={cardlength} prices={calcMen} />
        </div>
      </div>
      <div className="py-5 h-full">
        <div className="overflow-hidden h-full">
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
          <Slider ref={sliderRef} {...settings} className="flex h-full gap-10">
            {!Cardmen ? (
              <div className="grid place-items-center">
                <HashLoader loading={true} size={50} />
              </div>
            ) : (
              Cardmen.map((task) => (
                <div className="px-5" key={task.id}>
                  <TaskForCard
                  key={task.id}
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
