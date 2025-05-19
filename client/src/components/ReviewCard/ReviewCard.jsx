import "../../scss/ReviewCard.scss";
import Katherine from "../../assets/icons/Katherine.png";

export default function ReviewCard() {
  return (
    <>
      <div className="review-card">
        <img src={Katherine} alt="" />
        <div>
          <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
          <p>5.0</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, sequi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, sequi. pisicing elit. Eum, sequi.
        </p>
      </div>
    </>
  );
}
