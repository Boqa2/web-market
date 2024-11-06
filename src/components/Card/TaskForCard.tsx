import { Link } from "react-router-dom";
import { CardSliderData } from "./CardWomenImg";

const TaskForCard = ({
  title,
  id,
  price,
  card,
  url,
  hearts,
  handleHeart,
}: CardSliderData) => {
  return (
    <div className="relative container">
      <Link
        to={`${url ? "card4women" : "cardimgs"}/${id}`}
        className="space-y-3"
      >
        <div className="relative clear-start text-[20px]">
          <img className="rounded-lg shadow-2xl" src={card} alt="" />
        </div>
        <div className="px-2">
          <p>{title}</p>
          <div className="flex  justify-between items-center ">
            <p className="font-medium text-lg">{price}</p>
          </div>
        </div>
      </Link>
      <button
        onClick={handleHeart}
        className={`absolute rounded-[50%] bg-[#f9fafa] w-9 h-9 ${
          hearts ? "opacity-55" : "opacity-100"
        }opacity-55 top-1 items-center flex justify-center right-1`}
      >
        <i
          className={`bx ${hearts ? "text-red-600" : ""} ${
            hearts ? `bxs` : "bx"
          }-heart`}
        ></i>
      </button>
      <button className="w-9 right-1 bottom-0 absolute text-white h-9 rounded-[50%] hover:bg-[#fa7c7e] bg-[#ff6163]">
        <i className="bx bx-cart"></i>
      </button>
    </div>
  );
};

export default TaskForCard;
