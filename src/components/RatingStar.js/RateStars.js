import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const RatingStars = ({ stars, reviews, text }) => {
  //console.log(stars)
  //console.log(reviews)

  let ratingstar = Array.from({ length: 5 }, (elm, index) => {
    let number = index + 0.5;
    return (
      <>
        {stars >= index + 1 ? (
          <FaStar className="Text" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="Text" />
        ) : (
          <FaRegStar className="Text" />
        )}
      </>
    );
  });
  return (
    <>
      <div className="flex space-x-2 items-center">
        {ratingstar}
        <p>{text}</p>
      </div>
    </>
  );
};

export default RatingStars;
