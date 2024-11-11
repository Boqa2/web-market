import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TaskForCard from "../Card/TaskForCard";
import {
  useGetallcardQuery,
  useGetwomencardQuery,
  useUpdatecardMutation,
  useUpdatemencardMutation,
} from "../api/apiGetAll";
import TaskTrashCard from "../Trash/TaskTrashCard";
import { useRef, useState } from "react";
import TrashSticy from "../Trash/TrashSticy";
import { useNotification } from "../Libs/Notification";
import toast from "react-hot-toast";

const TrashPage = () => {
  const { data: Cardwomen, } = useGetwomencardQuery();
  const { data: Cardmen, isLoading, error } = useGetallcardQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [heart, setHeart] = useState<{ [id: number]: boolean }>({});
  const [upcardwomen] = useUpdatecardMutation();
  const [upcardmen] = useUpdatemencardMutation();
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  const { notificationCount, setNotificationCount, url, korzina, setKorzina } =
    useNotification();
  const updateCard = url ? upcardmen : upcardwomen;
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
  const handleHeartChange = async (id: number) => {
    const current = heart[id] || false
    try {
      await updateCard({
        id,
        body: { hearts: !current },
      }).unwrap();
      setHeart({ ...heart, [id]: !current });
      setNotificationCount(notificationCount - 1);
      toast.success(`Task ${!current ? "removed" : "added"} favorites`, { position: "top-right" });
    } catch (error) {
      console.error("Failed to update heart status:", error);
    }
  };
  const favorites = async (id: number) => {
    try {
      await updateCard({ id, body: { trash: false } });
      setFavorite({ ...favorite, [id]: false});
      setKorzina(korzina - 1);
      toast.success(`Task removed trash`, { position: "top-right" });
    } catch (error) {
      console.error(error);
    }
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
                  handleFavorite={() => favorites(tasks.id)}
                  handleHeart={() => handleHeartChange(tasks.id)}
                  hearts={
                    heart[tasks.id] || undefined
                      ? heart[tasks.id]
                      : tasks.hearts
                  }
                  trash={
                    favorite[tasks.id] !== undefined
                      ? favorite[tasks.id]
                      : tasks.trash
                  }
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
