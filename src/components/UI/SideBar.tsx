import { Link } from "react-router-dom";
import { useNotification } from "../Libs/Notification";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../app/store";
import { logout } from "../../app/rtqStore";

type Props = {
  openSidebar: () => void;
};
const SideBar = ({ openSidebar }: Props) => {
  const { notificationCount, korzina } = useNotification();
  const isAuthenticated = useSelector(
    (state: StoreState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-white px-8 py-4 z-[999] overflow-x-hidden overflow-y-scroll h-full fixed flex  justify-between top-0 left-0 md:w-2/6 w-3/5 ">
        <div className="w-full">
          <div className="my-4">
            <Link to={"/"} className="text-3xl font-semibold">
              Меню
            </Link>
          </div>
          <div className="border my-5 border-slate-500 w-[350px]"></div>
          <div>
            <Link to={"/"} className="font-medium text-xl my-5">
              Верхнее меню
            </Link>
            <div>
              <ul className="flex flex-col gap-2">
                <button onClick={openSidebar}>
                  <Link
                    className="relative mt-2 flex items-center"
                    to={"/favorites"}
                  >
                    {notificationCount ? (
                      <span className="notfiction ">{notificationCount}</span>
                    ) : (
                      ""
                    )}
                    <h1>Избранное</h1>
                  </Link>
                </button>
                <button onClick={openSidebar}>
                  <Link className="relative flex items-center" to={"/trash"}>
                    {korzina ? (
                      <span className="notfiction">{korzina}</span>
                    ) : (
                      ""
                    )}
                    <h1>Корзина</h1>
                  </Link>
                </button>
                <button onClick={openSidebar}>
                  <Link
                    to={"/login"}
                    className="hover relative flex items-center"
                  >
                    Личный кабинет
                  </Link>
                </button>
                {isAuthenticated ? (
                  <button
                    className="hover relative flex items-center"
                    onClick={() => dispatch(logout())}
                  >
                    Выйти
                  </button>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl my-4">Контакты</h1>
            <div className="my-5 flex gap-5 flex-col">
              <p>+992902300300</p>
              <p className="text-wrap">г.Душанбе н.Сино Хувайдуллоева 141/4 </p>
            </div>
          </div>
          <div className="my-5">
            <div className="text-3xl space-x-3 text-gray-900">
              <a href="linkedin: baxtovarshoh">
                <i className="bx bxl-linkedin-square"></i>
              </a>
              <a href="instagam: @baxtovarwox">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="number:+992902300300">
                <i className="bx bxl-telegram"></i>
              </a>
              <a href="facebook:facebook">
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
