import { Link } from "react-router-dom";
import { useNotification } from "../Libs/Notification";

type Props = {
  openSidebar: () => void;
};
const SideBar = ({ openSidebar }: Props) => {
  const { notificationCount, korzina } = useNotification();
  return (
    <>
      <div className="bg-white px-8 py-4 z-[999] overflow-x-hidden overflow-y-scroll h-full fixed flex  justify-between top-0 left-0 md:w-2/6 w-3/5 ">
        <div>
          <div className="my-4">
            <Link to={"/"} className="text-3xl font-semibold">Меню</Link>
          </div>
          <div className="border my-5 border-slate-500 w-[350px]"></div>
          <div>
            <h1 className="font-medium text-xl my-5">Верхнее меню</h1>
            <div>
              <ul className="flex flex-col gap-5">
                <Link className="relative flex items-center" to={"/favorites"}>
                  {notificationCount ? (
                    <span className="notfiction ">{notificationCount}</span>
                  ) : (
                    ""
                  )}
                  <h1>Избранное</h1>
                </Link>
                <Link className="relative flex items-center" to={"/trash"}>
                  {korzina ? (
                    <span className="notfiction">{korzina}</span>
                  ) : (
                    ""
                  )}
                  <h1>Корзина</h1>
                </Link>
                <li className="hover">Контакты</li>
                <li className="hover">Доставка</li>
                <li className="hover">Оплата</li>
                <Link to={"/login"} className="hover">
                  Личный кабинет
                </Link>
              </ul>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl my-8">Контакты</h1>
            <div className="my-5 flex gap-5 flex-col">
              <p>+992902300300</p>
              <p>г.Душанбе н.Сино Хувайдуллоева 141/4 </p>
            </div>
          </div>
          <div className="my-5">
            <div className="text-3xl space-x-3 text-gray-900">
              <a href="">
                <i className="bx bxl-youtube"></i>
              </a>
              <a href="">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="">
                <i className="bx bxl-telegram"></i>
              </a>
              <a href="">
                <i className="bx bxl-facebook-circle"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <button
        className="fixed z-[999] bg-white right-0 md:right-[800px] xl:left-96 top-10 w-10 h-10 border hover:shadow-inner flex justify-center items-center  rounded-[50%]"
        onClick={openSidebar}
      >
        <i className="bx bx-x"></i>
      </button>
    </>
  );
};

export default SideBar;
