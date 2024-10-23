import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
}

const StarRating = ({ totalStars = 5 }: StarRatingProps) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <span
          className={`cursor-pointer text-3xl mr-1  ${
            index < rating ? "text-yellow-500" : "text-slate-900"
          }`}
          key={index}
          onClick={() => handleClick(index + 1)}
        >
          &#9733;
        </span>
      ))}
      <span className="m-1 text-2xl">({rating})</span>
    </div>
  );
};

export default StarRating;
