import { Link } from "react-router-dom";
import { CardSliderData } from "../Libs/type/types";
import { useSelector } from "react-redux";
import { AuthState } from "../../app/rtqStore";

const TaskForCard = ({
  title,
  id,
  price,
  card,
  hearts,
  trash,
  handleHeart,
  handleFavorite,
  handleDelete
}: CardSliderData) => {
  const role = useSelector(
    (state: { auth: AuthState }) => state.auth.user?.role
  );

  return (
    <div className="relative container mb-4">
      <Link to={`cardimgs/${id}`} className="">
        <div className="relative h-[80%] text-[20px]">
          <img
            className="rounded-lg h-full w-full shadow-2xl"
            src={card}
            alt=""
          />
        </div>
        <div className="px-2">
          <p className="text-sm md:text-xl font-normal">{title}</p>
          <div className="flex justify-between items-center ">
            <p className="text-lg">{price} $</p>
          </div>
        </div>
      </Link>
      <button
        onClick={handleHeart}
        className={`absolute rounded-[50%] bg-[#f9fafa] w-9 h-9 ${
          hearts ? "bg-opacity-100" : "bg-opacity-55"
        } top-3 items-center flex justify-center right-3`}
      >
        <i
          className={`bx  ${hearts ? "text-red-600" : ""} ${
            hearts ? `bxs` : "bx"
          }-heart`}
        ></i>
      </button>
      <div className="flex ">
        <button
          onClick={handleFavorite}
          className="w-9 right-3 bottom-0 absolute text-white h-9 rounded-[50%] hover:bg-[#fa7c7e] bg-[#ff6163]"
        >
          <i className={`bx bx-cart${trash ? "-add" : ""}`}></i>
        </button>
        {role === "admin" ? (
          <button onClick={handleDelete} className="w-9 right-14 bottom-0 absolute text-white h-9 rounded-[50%] hover:bg-slate-700 bg-green-600">
            <i className="bx bx-trash"></i>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TaskForCard;
