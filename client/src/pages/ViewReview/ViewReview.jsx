import Navbar from "../../components/Navbar/Navbar";
import "../../scss/ViewReview.scss";
import Katherine from "../../assets/icons/Katherine.png";
import { Link } from "react-router-dom";

export default function ViewReview() {
  return (
    <>
      <div className="view-review">
        <Navbar />
        <div className="view-review-card">
          <div className="person-description">
            <img src={Katherine} alt="" />
            <div>
              <h1>Katherine Andrews</h1>
              <div>
                <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
                <p>5.0</p>
              </div>
            </div>
          </div>
          <div className="review-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              doloribus? Quis nisi modi inventore dolorem ipsa labore, debitis
              eaque in quas illo tempore harum officiis non. Quas reiciendis
              porro at magni repellat molestias a corrupti ex officia itaque
              consequatur atque eos voluptatem fugit architecto hic voluptates
              sapiente, ipsa vitae impedit eius. Dolore deserunt nobis
              temporibus esse repellat quidem! Perferendis doloremque veniam
              officia ipsa nam fuga alias vero suscipit facere inventore rem
              odio repellat sint voluptatibus, amet est cumque voluptas soluta
              maxime ipsum itaque odit rerum officiis? Aperiam culpa ullam est
              ipsum cum dolorum quidem, optio perferendis facilis officia eius
              quibusdam.
            </p>
          </div>
          <div className="manage-review">
            <div className="review-bar">
              <Link to={"/"} className="e-button">
                Edit Review
              </Link>
              <Link to={"/"} className="d-button">
                Delete Review
              </Link>
              <Link to={"/"} className="b-button">
                Back to Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
