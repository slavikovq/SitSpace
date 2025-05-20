import "../../scss/ReviewCard.scss";
import Katherine from "../../assets/icons/Katherine.png";
import { Link } from "react-router-dom";

export default function ReviewCard() {
  return (
    <>
<Link to={"/Review"} style={{ textDecoration: "none" }}>
  <div className="review-card">
    <img src={Katherine} alt="" />
    <p className="reviewer">Katherine Andrews</p>
    <div>
      <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
      <p>5.0</p>
    </div>
    <p className="review">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, sequi.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, sequi.
      pisicing elit. Eum, sequi.
    </p>
  </div>
</Link>
    </>
  );
}
