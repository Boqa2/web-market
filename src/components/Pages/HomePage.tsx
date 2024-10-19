import { useState } from "react";
import CardImg from "../Card/CardImg";
import CardSlider from "../Slider/CardSlider";

const HomePage = () => {
  const [btn, setBtn] = useState<boolean>(true);
  const [btn2, setBtn2] = useState<boolean>(false);
  const [url, setUrl] = useState<boolean>(false);

  const handleBorder = (buttonType: string) => {
    if (buttonType === "men") {
      setBtn(true);
      setBtn2(false);
    } else if (buttonType === "women") {
      setBtn(false);
      setBtn2(true);
    }

    if (url) {
      setUrl(false);
    } else {
      setUrl(true);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="relative z-0">
        <CardSlider />
      </div>
      <div className="flex justify-center my-2 text-lg font-medium items-center  gap-3">
        <button
          onClick={() => handleBorder("men")}
          className={`hover:text-slate-500 text-slate-900 ${
            btn ? `border-b-2 border-slate-300` : ""
          }`}
        >
          Мужчины
        </button>
        <button
          onClick={() => handleBorder("women")}
          className={`hover:text-slate-500 text-slate-900 ${
            btn2 ? `border-b-2 border-slate-300` : ""
          }`}
        >
          Женшины
        </button>
      </div>
      <div className="">
        <CardImg url={url} />
      </div>
    </div>
  );
};

export default HomePage;
