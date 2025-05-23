import Navbar from "../../components/Navbar/Navbar";
import "../../scss/ViewReview.scss";
import Katherine from "../../assets/icons/Katherine.png";
import { Link } from "react-router-dom";

export default function ViewReview() {
  return (
    <div className="view-review">
      <Navbar />
      <div className="view-review-box">
        <div className="view-review-card">
          <div className="desc-box">
            <div className="person-description">
              <img src={Katherine} alt="Katherine Andrews" />
              <div className="name-rating">
                <h1>Katherine Andrews</h1>
                <div className="rating">
                  <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
                  <p>5.0</p>
                </div>
              </div>
            </div>
            <div className="review-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                repellendus asperiores nesciunt at harum nisi rem dolorum. Non
                dolores deserunt eligendi. Aliquam eligendi inventore eius
                laboriosam labore nihil officiis possimus. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Reiciendis voluptates,
                incidunt, impedit quaerat temporibus beatae dicta accusamus
                ullam fugiat hic nemo aperiam quo ipsa facilis blanditiis
                quisquam! Soluta, amet placeat! Eum quae a maxime culpa
                reprehenderit, accusamus necessitatibus, accusantium quisquam
                officiis tempora, temporibus praesentium. Blanditiis error
                exercitationem voluptatum sunt, vitae sed quas. Alias reiciendis

              </p>
            </div>
          </div>
          <div className="manage-review">
            <div className="review-bar">
                <Link to="/" className="e-button">
                  Edit review
                </Link>
                <Link to="/" className="d-button">
                  Delete review
                </Link>
                <p>|</p>
              <div className="b-button">
                <Link to="/">Back to reviews</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
