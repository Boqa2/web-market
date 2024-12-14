import { useState } from "react";
import CardSlider from "../Slider/CardSlider";
import CardMenImg from "../Card/CardMenImg";
import { useNotification } from "../Libs/Notification";
import { useSelector } from "react-redux";
import { AuthState } from "../../app/rtqStore";

const HomePage = () => {
  const [btn, setBtn] = useState<boolean>(true);
  const [btn2, setBtn2] = useState<boolean>(false);
  const { setUrl } = useNotification();
  const handleBorder = (buttonType: string) => {
    if (buttonType === "men") {
      setBtn(true);
      setBtn2(false);
    } else if (buttonType === "women") {
      setBtn(false);
      setBtn2(true);
    }

    if (buttonType === "men") {
      setUrl("female");
    } else if (buttonType === "women") {
      setUrl("male");
    }
  };
  const user = useSelector(
    (state: { auth: AuthState }) => state.auth.user?.name
  );
  const role = useSelector(
    (state: { auth: AuthState }) => state.auth.user?.role
  );
  return (
    <div className="flex container mx-auto md:w-full flex-col gap-2">
      <div className="relative z-0">
        <CardSlider />
      </div>

      {user && (
        <p className="text-sm font-medium md:hidden flex justify-center items-center  ">
          {user ? (
            <>
              {" "}
              <i className={`bx bxs-user ${role ? "text-green-500" : "text-blue-500"} text-2xl mr-2`}></i> {user.toUpperCase()}{" "}
            </>
          ) : (
            ""
          )}
        </p>
      )}
      <div className="flex justify-center mb-6 gap-5  text-lg font-medium items-center">
        <button
          onClick={() => handleBorder("men")}
          className={`hover:text-slate-500 text-slate-900 ${
            btn ? `border-b border-black` : ""
          }`}
        >
          Мужчины
        </button>
        <button
          onClick={() => handleBorder("women")}
          className={`hover:text-slate-500 text-slate-900 ${
            btn2 ? `border-b border-black` : ""
          }`}
        >
          Женшины
        </button>
      </div>
      <div className="relative w-full">
        <CardMenImg  />
      </div>
    </div>
  );
};

export default HomePage;
