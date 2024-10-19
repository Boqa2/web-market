import { CardSliderData } from "./CardImg";

const TaskForCard = ({title, id, price, card,}:  CardSliderData) => {
    return ( 
        <div  className="space-y-3" key={id}>
            <div className="relative clear-start text-[20px]">
              <img className="rounded-lg" src={card} alt="" />
              <button className="absolute rounded-[50%] bg-[#f9fafa] hover:opacity-100  w-9 h-9 opacity-55 top-1 items-center flex justify-center right-1">
                <i className="bx bx-heart"></i>
              </button>
            </div>
            <div className="px-2">
              <p>
                {title}
              </p>
              <div className="flex  justify-between items-center ">
                <p>{price}</p>
                <button className="w-9 text-white h-9 rounded-[50%] hover:bg-[#fa7c7e] bg-[#ff6163]">
                <i className='bx bx-cart'></i>
                </button>
              </div>
            </div>
          </div>
     );
}
 
export default TaskForCard;