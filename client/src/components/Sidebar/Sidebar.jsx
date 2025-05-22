import { Link } from "react-router-dom";
import "../../scss/Sidebar.scss";
import logo from "../../assets/img/logo.png";
import Katherine from "../../assets/icons/Katherine.png";
import clipboard from "../../assets/icons/clipboard.svg";
import couch from "../../assets/icons/couch.svg";
import folder from "../../assets/icons/folder.svg";
import group from "../../assets/icons/group.svg";
import logout from "../../assets/icons/logout.svg";
import plus from "../../assets/icons/plus.svg";
import star from "../../assets/icons/star.svg";
import user from "../../assets/icons/user.svg";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>

        <div className="sidebar-part">
          <div className="section-divider">
            <span>SEATING</span>
          </div>

          <nav>
            <Link to="/" className="nav-item">
              <img src={couch} alt="" />
              Seating Preview
            </Link>
            <Link to="/" className="nav-item">
              <img src={clipboard} alt="" />
              Seating Plan
            </Link>
            <Link to="/" className="nav-item">
              <img src={plus} alt="" />
              Create classroom
            </Link>
            <Link to="/" className="nav-item">
              <img src={group} alt="" />
              Create group
            </Link>
            <Link to="/" className="nav-item">
              <img src={folder} alt="" />
              Groups
            </Link>
            <Link to="/" className="nav-item">
              <img src={folder} alt="" />
              Classes
            </Link>
          </nav>
        </div>

        <div className="sidebar-part">
          <div className="section-divider">
            <span>SETTINGS</span>
          </div>
          <nav>
            <Link to="/" className="nav-item">
              <img src={user} alt="" />
              Account
            </Link>
            <Link to="/" className="nav-item">
              <img src={star} alt="" />
              Write a review
            </Link>
          </nav>
        </div>

        <div className="sidebar-profile">
          <img src={Katherine} alt="profile" />
          <div>
            <p className="name">Katherine Andrews</p>
            <p>katherine@email.com</p>
          </div>
          <img src={logout} alt="" className="logout" />
        </div>
      </div>
    </>
  );
}
