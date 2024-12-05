import Logo from "../Libs/urls";
import { useState } from "react";
import SideBar from "./SideBar";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNotification } from "../Libs/Notification";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [input, setInput] = useState<boolean>(false);
  const { notificationCount } = useNotification();
  const { korzina } =useNotification()
  const { register } = useForm();
  
  return (
    <div className="p-1 sticky  shadow-xl right-0 top-0 z-[999] mb-5  px-5 bg-gray-200 ">
      <header className="flex container mx-auto gap-6 text-2xl items-center md:pl-0 pl-5 justify-between ">
        <div className="flex md:order-none order-3 gap-2 font-semibold items-center text-xl">
          <button className="text-3xl" onClick={() => setOpenSidebar(true)}>
            <i className="bx bx-menu"></i>
          </button>
          <Link className="lg:block hidden" to={"/"}>
            Меню
          </Link>
        </div>
        <div className="py-3">
          {!input ? (
            <div className="flex justify-center w-full ">
              <img  src={Logo.urllogo} alt="" />
            </div>
          ) : (
            <div className="relative">
              <input
                {...register("title")}
                className="py-[9px] text-xl outline-none rounded-md px-3 w-[600px]"
                type="text"
              />
              <button
                onClick={() => setInput(false)}
                className="absolute top-2 right-1"
              >
                <i className="bx bx-x"></i>
              </button>
            </div>
          )}
        </div>
        <div className="space-x-10 md:block hidden">
          <button onClick={() => setInput(true)}>
            <i className="bx bx-search-alt"></i>
          </button>
          <Link className="relative" to={"/favorites"}>
          {notificationCount > 0 ? (<span className="notfiction">{notificationCount}</span>) : ""}
            
            <i className="bx bx-heart"></i>
          </Link>
          <Link className="relative" to={"/trash"}>
          {korzina > 0 ? (<span className="notfiction">{korzina}</span>) : ""}
            <i className="bx bx-cart-alt"></i>
          </Link>
        </div>
      </header>
      {openSidebar && <SideBar openSidebar={() => setOpenSidebar(false)} />}
    </div>
  );
};

export default Header;
