import { Link } from "react-router-dom";
import "../../scss/Sidebar.scss";
import logo from "../../assets/img/logo.png";
import userPfp from "../../../assets/img/user.png"
import clipboard from "../../assets/icons/clipboard.svg";
import couch from "../../assets/icons/couch.svg";
import folder from "../../assets/icons/folder.svg";
import group from "../../assets/icons/group.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import plus from "../../assets/icons/plus.svg";
import star from "../../assets/icons/star.svg";
import userIcon from "../../assets/icons/user.svg";
import house from "../../assets/icons/house.svg";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { alert } from "../../utils/sweetAlert";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutConfirm = () => {
    const Alert = Swal.mixin({
      buttonsStyling: true,
    });
    Alert.fire({
      title: "Do you really want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      color: "black",
      confirmButtonColor: "#D7B5A2",
      cancelButtonText: "Stay logged in",
      cancelButtonColor: "#1E1E1E",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        alert("info", "You have been logged out.");
      }
    });
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>

        <div className="sidebar-part">
          <nav>
            <Link to="/" className="nav-item">
              <img src={house} alt="" />
              Home
            </Link>
          </nav>
          <div className="section-divider">
            <span>SEATING</span>
          </div>

          <nav>
            <Link to="/sitManager/seatingPreview" className="nav-item">
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
            <Link to="/sitManager/account" className="nav-item">
              <img src={userIcon} alt="" />
              Account
            </Link>
            <Link to="/sitManager/manageReview" className="nav-item">
              <img src={star} alt="" />
              Write a review
            </Link>
          </nav>
        </div>

        <div className="sidebar-profile">
          <img src={userPfp} alt={userPfp} />
          <div className="inicials">
            <p className="name">Katherine Andrews</p>
            <p className="email">katherine@email.com</p>
          </div>
          <img src={logoutIcon} alt="" className="logout" onClick={logoutConfirm}/>
        </div>
      </div>
    </>
  );
}
