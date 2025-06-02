import "../../scss/SeatingPreviewCard.scss";
import trash from "../../assets/icons/trash.png";
import pencil from "../../assets/icons/pencil.png";
import Swal from "sweetalert2";
import { alert } from "../../utils/sweetAlert";

import { Link } from "react-router-dom";
import { deletePlan } from "../../models/plan";

export default function SeatingPreviewCard({ plan, view, sharedBy }) {
  const deleteConfirm = async () => {
    const Alert = Swal.mixin({
      buttonsStyling: true,
    });
    Alert.fire({
      title: "Do you want to delete this seating plan?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete plan",
      color: "black",
      confirmButtonColor: "#D7B5A2",
      cancelButtonText: "No, don't delete",
      cancelButtonColor: "#1E1E1E",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deletePlan(plan._id);
        if (res.status === 200) {
          alert("success", "Seating plan has been deleted.");
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
      <div className="sp-card">
        <h1 className="sp-header">{plan.classroom_name}</h1>
        <div className="details">
          <div>
            <span>Group:</span> {plan.group_name}
          </div>
          <div>
            <span>Number of seats:</span> {plan.seats_count}
          </div>
          <div>
            <span>Number of students:</span> {plan.students_count}
          </div>
        </div>
        <div className="sp-footer">
          <div className="sp-icons">
            {view === "normal" ? (
              <>
                <Link to={`/sitManager/updateSeatingPlan/${plan._id}`}>
                  <img src={pencil} alt="edit" />
                </Link>
                <Link>
                  <img src={trash} alt="delete" onClick={deleteConfirm} />
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
          <Link
            to={`/sitManager/seatingPlan/${plan._id}`}
            className="show-more"
          >
            Show more...
          </Link>
        </div>
      </div>
    </>
  );
}
