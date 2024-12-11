import { useRef, useState } from "react";
import TaskForCard from "../Card/TaskForCard";
import { useGetallcardQuery } from "../api/apiGetAll";
import { HashLoader } from "react-spinners";
import { useNotification } from "../Libs/Notification";
import supabase from "../Libs/supabase/subpabase";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { AuthState } from "../../app/rtqStore";

const FavoritesPage = () => {
  const {
    data: Cardmen,
    isLoading: Cardloadmen,
    error: Carderrmen,
  } = useGetallcardQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [hearts, setHearts] = useState<{ [id: number]: boolean }>({});
  const [favorite, setFavorite] = useState<{ [id: number]: boolean }>({});
  const { notificationCount, setNotificationCount, korzina, setKorzina } =
    useNotification();
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

  const handleHeartChange = async (id: number) => {
    const currentStatus = hearts[id] || false;
    try {
      await supabase
        .from("myRequest")
        .update({ hearts: !currentStatus })
        .eq("id", id);

      toast.success(
        `Task ${!currentStatus ? "add to" : "delete from"} favorite`
      );
      if (!currentStatus) {
        setNotificationCount(notificationCount + 1);
      } else {
        setNotificationCount(notificationCount - 1);
      }
      setHearts({ ...hearts, [id]: !currentStatus });

      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  const favorites = async (id: number) => {
    const currentStatus = favorite[id];
    try {
      await supabase
        .from("myRequest")
        .update({ hearts: !currentStatus })
        .eq("id", id); // Выбираем только нужные поля

      toast.success(`Task ${!currentStatus ? "add to" : "delet from"} cart`);
      if (!currentStatus) {
        setKorzina(korzina + 1);
      } else {
        setKorzina(korzina - 1);
      }
      setFavorite({ ...favorite, [id]: !currentStatus });
    } catch (error) {
      console.log(error);
    }
  };
  const user = useSelector((state: { auth: AuthState }) => state.auth.user?.id);
  
  
  return (
    <div className="px-10">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-medium">Избранное</h1>
        </div>
        <div className="xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid gap-10 px-2">
          {Cardloadmen ? (
            <div className="grid place-items-center">
              <HashLoader loading={true} size={50} />
            </div>
          ) : Carderrmen ? (
            <>Fetch loading error</>
          ) : Cardmen && Cardmen.length >= 0 ? (
            Cardmen.filter((task) => {
              const heartStatus =
                hearts[task.id] !== undefined ? hearts[task.id] : task.hearts;
              return heartStatus === true && task.user_id === user;
            }).map((tasks) => (
              <TaskForCard
                trash={
                  favorite[tasks.id] !== undefined
                    ? favorite[tasks.id]
                    : tasks.trash
                }
                handleFavorite={() => favorites(tasks.id)}
                handleHeart={() => handleHeartChange(tasks.id)}
                hearts={
                  hearts[tasks.id] !== undefined
                    ? hearts[tasks.id]
                    : tasks.hearts
                }
                id={tasks.id}
                key={tasks.id}
                title={tasks.title}
                card={tasks.card}
                price={tasks.price}
                about={tasks.about}
              />
            ))
          ) : (
            <>Добавте в изранное </>
          )}
        </div>
        <div>
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
              <Slider
                ref={sliderRef}
                {...settings}
                className="flex h-full gap-10"
              >
                {!Cardmen ? (
                  <div className="grid place-items-center">
                    <HashLoader loading={true} size={50} />
                  </div>
                ) : (
                  Cardmen.map((task) => (
                    <div className="px-5" key={task.id}>
                      <TaskForCard
                        trash={
                          favorite[task.id] !== undefined
                            ? favorite[task.id]
                            : task.trash
                        }
                        handleFavorite={() => favorites(task.id)}
                        handleHeart={() => handleHeartChange(task.id)}
                        hearts={
                          hearts[task.id] !== undefined
                            ? hearts[task.id]
                            : task.hearts
                        }
                        key={task.id}
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
      </div>
    </div>
  );
};

export default FavoritesPage;
