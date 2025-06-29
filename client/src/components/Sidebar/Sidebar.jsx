import { Link } from "react-router-dom";
import "../../scss/Sidebar.scss";
import logo from "../../assets/img/logo.png";
import userPfp from "../../assets/img/user.png";
import clipboard from "../../assets/icons/clipboard.svg";
import couch from "../../assets/icons/couch.svg";
import folder from "../../assets/icons/folder.svg";
import group from "../../assets/icons/group.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import plus from "../../assets/icons/plus.svg";
import star from "../../assets/icons/star.svg";
import userIcon from "../../assets/icons/user.svg";
import house from "../../assets/icons/house.svg";
import xmark from "../../assets/icons/xmark.svg";
import peopleGroup from "../../assets/icons/peopleGroup.svg"

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { alert } from "../../utils/sweetAlert";

export default function Sidebar({ page, activeSidebar, showSidebar }) {
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
      <div className={`sidebar ${activeSidebar ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="sh-left">
            <img src={logo} alt="" className="sidebar-logo" />
          </div>
          <div className="sh-right">
            <img src={xmark} alt="" id="x" onClick={showSidebar}/>
          </div>
        </div>
        <div className="sidebar-parts">
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
              <Link
                to="/sitManager/createPlan"
                className="nav-item"
                id={page === "createPlan" ? "active" : ""}
              >
                <img src={couch} alt="" />
                Create seating plan
              </Link>
              <Link
                to="/sitManager/seatingPlans"
                className="nav-item"
                id={page === "seatingPlans" ? "active" : ""}
              >
                <img src={clipboard} alt="" />
                Seating plans
              </Link>
              <Link
                to="/sitManager/createClassroom"
                className="nav-item"
                id={page === "createClassroom" ? "active" : ""}
              >
                <img src={plus} alt="" />
                Create classroom
              </Link>
              <Link
                to="/sitManager/classes"
                className="nav-item"
                id={page === "classes" ? "active" : ""}
              >
                <img src={folder} alt="" />
                Classes
              </Link>
              <Link
                to="/sitmanager/createGroup"
                className="nav-item"
                id={page === "createGroup" ? "active" : ""}
              >
                <img src={group} alt="" />
                Create group
              </Link>
              <Link
                to="/sitManager/groups"
                className="nav-item"
                id={page === "groups" ? "active" : ""}
              >
                <img src={folder} alt="" />
                Groups
              </Link>
              <Link
                to="/sitManager/invitePeople"
                className="nav-item"
                id={page === "invite" ? "active" : ""}
              >
                <img src={peopleGroup} alt="" />
                Invite people
              </Link>
            </nav>
          </div>
          <div className="sidebar-part">
            <div className="section-divider">
              <span>SETTINGS</span>
            </div>
            <nav>
              <Link
                to="/sitManager/account"
                className="nav-item"
                id={page === "account" ? "active" : ""}
              >
                <img src={userIcon} alt="" />
                Account
              </Link>
              <Link
                to="/sitManager/manageReview"
                className="nav-item"
                id={page === "review" ? "active" : ""}
              >
                <img src={star} alt="" />
                Write a review
              </Link>
            </nav>
          </div>
        </div>
        <div className="sidebar-profile">
          <img
            src={user.profilePicture ? user.profilePicture : userPfp}
            alt={userPfp}
          />
          <div className="inicials">
            <p className="name">
              {user.first_name} {user.last_name}
            </p>
            <p className="email">{user.email}</p>
          </div>
          <img
            src={logoutIcon}
            alt=""
            className="logout"
            onClick={logoutConfirm}
          />
        </div>
      </div>
    </>
  );
}
