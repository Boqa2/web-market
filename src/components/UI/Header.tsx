import Logo from "../Libs/urls";
import { useState } from "react";
import SideBar from "./SideBar";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [input, setInput] = useState<boolean>(false);
  const { register } = useForm();
  
  return (
    <div className="p-3 container">
      <header className="flex text-2xl items-center mb-3 justify-between ">
        <div className="flex gap-2 font-semibold items-center text-xl">
          <button className="text-3xl" onClick={() => setOpenSidebar(true)}>
            <i className="bx bx-menu"></i>
          </button>
          <Link className="lg:block hidden" to={"/"}>
            Меню
          </Link>
        </div>
        <div className="py-3">
          {!input ? (
            <div className="flex justify-center w-full justify-start">
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
          <Link to={"/favorites"}>
            <i className="bx bx-heart"></i>
          </Link>
          <Link to={"/trash"}>
            <i className="bx bx-cart-alt"></i>
          </Link>
        </div>
      </header>
      {openSidebar && <SideBar openSidebar={() => setOpenSidebar(false)} />}
      <div className="border border-slate-300 "></div>
      <div className="flex justify-center my-2 mt-3 text-slate-900 text-lg font-medium items-center  gap-3">
        <a
          className="hover:text-slate-500
          "
          href=""
        >
          Женшинам
        </a>
        <a
          className="hover:text-slate-500
          "
          href=""
        >
          Мужчинам
        </a>
      </div>
    </div>
  );
};

export default Header;
