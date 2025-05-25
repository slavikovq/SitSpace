import "../../scss/ClassCard.scss";
import trash from "../../assets/icons/trash.png";
import pencil from "../../assets/icons/pencil.png";

import { Link } from "react-router-dom";

export default function ClassCard() {
  return (
    <>
      <div className="c-card">
        <h1 className="c-header">Class name</h1>
        <div className="details">
          <div>
            <span>Class id:</span> #1
          </div>
          <div>
            <span>Number of seats:</span> 30
          </div>
        </div>
        <div className="c-footer">
          <div className="c-icons">
            <Link to={"/"}>
              <img src={pencil} alt="edit" />
            </Link>
            <Link to={"/"}>
              <img src={trash} alt="delete" />
            </Link>
          </div>
          <Link to={"/sitManager/classes/specific"} className="show-more">
            Show more...
          </Link>
        </div>
      </div>
    </>
  );
}
