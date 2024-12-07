import { useState } from "react";
import CardSlider from "../Slider/CardSlider";
import CardMenImg from "../Card/CardMenImg";
import { useNotification } from "../Libs/Notification";
import { useGetallcardQuery } from "../api/apiGetAll";

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
  const {data} = useGetallcardQuery()

  console.log(data);
  

  return (
    <div className="flex container mx-auto md:w-full flex-col  gap-10">
      <div className="relative z-0">
        <CardSlider />
      </div>
      <div className="flex justify-center my-2 text-lg font-medium items-center  gap-3">
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
      <div className="">
        <CardMenImg />
      </div>
    </div>
  );
};

export default HomePage;
