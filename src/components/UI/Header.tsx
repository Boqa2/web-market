import Logo from "../Libs/urls";
import { useState } from "react";
import SideBar from "../SideBar";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [input, setInput] = useState<boolean>(false);

  const { register } = useForm();

  return (
    <div className="p-3">
      <header className="flex text-2xl justify-between ">
        <div className="flex gap-2 font-semibold items-center text-xl">
          <button
            className="shadow-2xl border font-semibold flex items-center justify-center rounded-[50%] w-10 h-10"
            onClick={() => setOpenSidebar(true)}
          >
            <i className="bx bx-menu"></i>
          </button>
          <Link to={"/"}>Меню</Link>
        </div>
        <div>
          {!input ? (
            <img src={Logo.urllogo} alt="" />
          ) : (
            <div className="relative">
              <input
                {...register("title")}
                className="py-[9px] outline-none rounded-md px-3 w-[600px]"
                type="text"
              />
              <button onClick={()=>setInput(false)} className="absolute top-2 right-1">
                <i className="bx bx-x"></i>
              </button>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setInput(true)}>
            <i className="bx bx-search-alt"></i>
          </button>
          <Link to={"/trash"}>
            <i className="bx bx-cart-alt"></i>
          </Link>
        </div>
      </header>
      {openSidebar && <SideBar openSidebar={() => setOpenSidebar(false)} />}
    </div>
  );
};

export default Header;
