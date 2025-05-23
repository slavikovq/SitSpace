import "../../scss/SeatingPreviewCard.scss";
import trash from "../../assets/icons/trash.png";
import pencil from "../../assets/icons/pencil.png";

import { Link } from "react-router-dom";

export default function SeatingPreviewCard() {
  return (
    <>
      <div className="sp-card">
        <h1 className="sp-header">Classroom name</h1>
        <div className="details">
          <div>
            <span>Group id:</span> #1
          </div>
          <div>
            <span>Number of seats:</span> 30
          </div>
          <div>
            <span>Number of students:</span> 28
          </div>
        </div>
        <div className="sp-footer">
          <div className="sp-icons">
            <Link to={"/"}>
              <img src={pencil} alt="edit" />
            </Link>
            <Link to={"/"}>
              <img src={trash} alt="delete" />
            </Link>
          </div>
          <Link to={"/"} className="show-more">
            Show more...
          </Link>
        </div>
      </div>
    </>
  );
}
