import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getUserPlanById, deletePlan } from "../../../models/plan";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { getUserClassById } from "../../../models/class";
import { alert } from "../../../utils/sweetAlert";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthProvider";

export default function ViewSeatingPlan() {
  const { id } = useParams();
  const { user } = useAuth();
  const [seatingPlan, setSeatingPlan] = useState();
  const [layout, setLayout] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Seating plan • SitSpace";

    const load = async () => {
      const res = await getUserPlanById(id);
      if (res.status === 200) {
        setSeatingPlan(res.payload);
        await loadLayout(res.payload.class_id);
      }
      if (res.status === 404 || res.status === 500) {
        setIsLoading(null);
      }
    };

    load();
  }, []);

  const loadLayout = async (class_id) => {
    const res = await getUserClassById(class_id);
    if (res.status === 200) {
      setLayout(res.payload.layout);
      setIsLoading(false);
    }
    if (res.status === 404 || res.status === 500) {
      setIsLoading(null);
    }
  };

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
        const res = await deletePlan(seatingPlan._id);
        if (res.status === 200) {
          alert("success", "Seating plan has been deleted.");
          navigate("/sitManager/seatingPlans");
        }
        if (res.status === 400 || res.status === 500) {
          alert("error", `${res.message}`);
        }
      }
    });
  };

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Seating plan" pageNow={"seatingPlans"}>
      <div className="sp-body">
        <div className="sp-content">
          <div className="sp-content-body" id="viewSpecific">
            <div className="classroom-preview" id="noBorder">
              <div id="cp-header">
                <h1>{seatingPlan.classroom_name}</h1>
                <p>
                  <b>Group: </b>
                  {seatingPlan.group_name}
                </p>
              </div>
              {seatingPlan.author_id === user._id ? (
                <>
                  <div className="button-group" id="viewSpecificBtn">
                    <Link
                      to={`/sitManager/updateSeatingPlan/${seatingPlan._id}`}
                    >
                      <button className="group-edit-btn">Edit plan</button>
                    </Link>
                    <button
                      className="group-delete-btn"
                      onClick={deleteConfirm}
                    >
                      Delete plan
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="cc-table">
                <table id="maleft">
                  <thead>
                    <tr>
                      <th></th>
                      {layout[0].map((_, cIdx) => (
                        <th key={cIdx}>{String.fromCharCode(65 + cIdx)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {layout.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <th>{rIdx + 1}</th>
                        {row.map((cell, cIdx) => {
                          if (cell === null) {
                            return (
                              <td
                                key={cIdx}
                                className="cc-table-td"
                                style={{ backgroundColor: "transparent" }}
                              />
                            );
                          }

                          const seatsInCell =
                            seatingPlan.plan?.[rIdx]?.[cIdx] ||
                            Array(cell).fill(null);

                          return (
                            <td
                              key={cIdx}
                              className="cc-table-td"
                              style={{ backgroundColor: "#EBEBEB" }}
                              id="large"
                            >
                              <div className="seats-inside">
                                {seatsInCell.map((studentName, seatIdx) => (
                                  <div key={seatIdx} className="seat">
                                    {studentName || (
                                      <span style={{ color: "#999" }}>
                                        Empty
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                        <th>&nbsp;</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
