import Logo from "../Libs/urls";
import { useState } from "react";
import SideBar from "./SideBar";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { useNotification } from "../Libs/Notification";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, logout } from "../../app/rtqStore";
import { StoreState } from "../../app/store";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { notificationCount } = useNotification();
  const { korzina } = useNotification();
  const isAuthenticated = useSelector(
    (state: StoreState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { auth: AuthState }) => state.auth.user?.name
  );

  return (
    <div className="p-1 sticky  shadow-xl right-0 top-0 z-[999] mb-5  px-5 bg-gray-200 ">
      <header className="flex container mx-auto gap-6 text-2xl items-center md:pl-0 pl-5 justify-between ">
        <div className="flex relative md:order-none order-3 gap-2 font-semibold items-center text-xl">
          <button
            className="text-3xl flex flex-col md:hidden"
            onClick={() => setOpenSidebar(true)}
          >
            <i className="bx bx-menu"></i>
          </button>
          <p className="text-sm font-medium md:flex hidden items-center">
            {" "}
            {user ? (
              <>
                {" "}
                <i className="bx bxs-user text-green-500 text-2xl mr-2"></i> {user.toUpperCase()}{" "}
              </>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="py-3 flex w-full justify-center ">
          <Link to={"/"} className="flex justify-center w-full ">
            <img src={Logo.urllogo} alt="" />
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="space-x-10 md:flex  hidden">
            <Link className="relative" to={"/favorites"}>
              {notificationCount ? (
                <span className="notfiction">{notificationCount}</span>
              ) : (
                ""
              )}
              <i className="bx bx-heart"></i>
            </Link>
            <Link className="relative" to={"/trash"}>
              {korzina > 0 ? <span className="notfiction">{korzina}</span> : ""}
              <i className="bx bx-cart-alt"></i>
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  window.location.reload();
                }}
              >
                <i className="bx bx-log-out"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </header>
      {openSidebar && <SideBar openSidebar={() => setOpenSidebar(false)} />}
    </div>
  );
};

export default Header;
