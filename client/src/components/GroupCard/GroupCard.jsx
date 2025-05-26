import "../../scss/GroupCard.scss";
import trash from "../../assets/icons/trash.png";
import pencil from "../../assets/icons/pencil.png";
import Swal from "sweetalert2";
import { alert } from "../../utils/sweetAlert";

import { Link } from "react-router-dom";
import { deleteGroup } from "../../models/group";

export default function GroupCard({ group }) {

  const deleteConfirm = async () => {
    const Alert = Swal.mixin({
      buttonsStyling: true,
    });
    Alert.fire({
      title: "Do you want to delete this group?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete group",
      color: "black",
      confirmButtonColor: "#D7B5A2",
      cancelButtonText: "No, don't delete",
      cancelButtonColor: "#1E1E1E",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteGroup(group._id);
        if (res.status === 200) {
          alert("success", "Group has been deleted.");
          window.location.reload();
        }
        if (res.status === 400 || res.status === 500) {
          alert("error", `${res.message}`);
        }
      }
    });
  };

  return (
    <>
      <div className="g-card">
        <h1 className="g-header">{group.group_name}</h1>
        <div className="details">
          <div>
            <span>Group id:</span> #{group.group_id}
          </div>
          <div>
            <span>Number of students:</span> {group.students.length}
          </div>
        </div>
        <div className="g-footer">
          <div className="g-icons">
            <Link to={`/sitManager/updateGroup/${group._id}`}>
              <img src={pencil} alt="edit" />
            </Link>
            <Link>
              <img src={trash} alt="delete" onClick={deleteConfirm}/>
            </Link>
          </div>
          <Link to={`/sitManager/group/${group._id}`} className="show-more">
            Show more...
          </Link>
        </div>
      </div>
    </>
  );
}
