import "../../scss/ReviewCard.scss";
import Katherine from "../../assets/icons/Katherine.png";
import { Link } from "react-router-dom";
import starFull from "../../assets/icons/starFull.svg"
import starEmpty from "../../assets/icons/starEmpty.svg"

export default function ReviewCard({ review }) {
  const shortenedText =
    review.text.length > 240 ? review.text.slice(0, 240) + "..." : review.text;
  return (
    <>
      <Link to={`/review/${review._id}`} style={{ textDecoration: "none" }}>
        <div className="review-card">
          <img src={Katherine} alt="" />
          <p className="reviewer">Katherine Andrews</p>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < review.rating ? starFull : starEmpty}
                onClick={() => handleStarClick(index)}
              />
            ))}
            <p style={{ color: "black" }}>{`${review.rating}.0`}</p>
          </div>
          <p className="review">{shortenedText}</p>
        </div>
      </Link>
    </>
  );
}
