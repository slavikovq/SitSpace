import "../../scss/GroupCard.scss";
import trash from "../../assets/icons/trash.png";
import pencil from "../../assets/icons/pencil.png";

import { Link } from "react-router-dom";

export default function GroupCard() {
  return (
    <>
      <div className="g-card">
        <h1 className="g-header">Group name</h1>
        <div className="details">
          <div>
            <span>Group id:</span> #1
          </div>
          <div>
            <span>Number of students:</span> 28
          </div>
        </div>
        <div className="g-footer">
          <div className="g-icons">
            <Link to={"/"}>
              <img src={pencil} alt="edit" />
            </Link>
            <Link to={"/"}>
              <img src={trash} alt="delete" />
            </Link>
          </div>
          <Link to={"/sitManager/groups/specific"} className="show-more">
            Show more...
          </Link>
        </div>
      </div>
    </>
  );
}
