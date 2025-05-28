import "../../scss/ClassCard.scss";
import trash from "../../assets/icons/trash.png";
import pencil from "../../assets/icons/pencil.png";
import Swal from "sweetalert2";
import { alert } from "../../utils/sweetAlert";

import { Link } from "react-router-dom";
import { deleteClass } from "../../models/class";

export default function ClassCard({ classroom }) {

    const deleteConfirm = async () => {
      const Alert = Swal.mixin({
        buttonsStyling: true,
      });
      Alert.fire({
        title: "Do you want to delete this classroom?",
        showCancelButton: true,
        confirmButtonText: "Yes, delete classroom",
        color: "black",
        confirmButtonColor: "#D7B5A2",
        cancelButtonText: "No, don't delete",
        cancelButtonColor: "#1E1E1E",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteClass(classroom._id);
          if (res.status === 200) {
            alert("success", "Classroom has been deleted.");
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
      <div className="c-card">
        <h1 className="c-header">{classroom.class_name}</h1>
        <div className="details">
          <div>
            <span>Class id:</span> #{classroom.class_id}
          </div>
          <div>
            <span>Number of seats:</span> {classroom.total_seats}
          </div>
        </div>
        <div className="c-footer">
          <div className="c-icons">
            <Link to={`/sitManager/updateClassroom/${classroom._id}`}>
              <img src={pencil} alt="edit" />
            </Link>
            <Link>
              <img src={trash} alt="delete" onClick={deleteConfirm}/>
            </Link>
          </div>
          <Link to={`/sitManager/class/${classroom._id}`} className="show-more">
            Show more...
          </Link>
        </div>
      </div>
    </>
  );
}
