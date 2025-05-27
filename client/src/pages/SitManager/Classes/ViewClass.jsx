import "../../../scss/Classes.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getUserClassById, deleteClass } from "../../../models/class";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";
import Swal from "sweetalert2";
import { alert } from "../../../utils/sweetAlert";

export default function ViewClass() {
  const { id } = useParams();
  const [classroom, setClassroom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Class • SitSpace";

    const load = async () => {
      const res = await getUserClassById(id);
      if (res.status === 200) {
        setClassroom(res.payload);
        setIsLoading(false);
      }
      if (res.status === 404 || res.status === 500) {
        setIsLoading(null);
      }
    };

    load();
  }, []);

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
          return navigate("/sitManager/classes");
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
    <SitManagerView
      headerText={`Classroom (${classroom.class_name})`}
      pageNow={"classes"}
    >
      <div className="cc-body">
        <div className="class-info">
          <div className="class-details">
            <h1>Class information</h1>
            <div>
              <span>Class ID:</span> #{classroom.class_id}
            </div>
            <div>
              <span>Number of seats:</span> {classroom.total_seats}
            </div>
          </div>

          <div className="button-class">
            <button
              className="class-edit-btn"
              onClick={() =>
                navigate(`/sitManager/updateClassroom/${classroom._id}`)
              }
            >
              Edit class
            </button>
            <button className="class-delete-btn" onClick={deleteConfirm}>
              Delete class
            </button>
          </div>
        </div>

        <div className="classroom-preview">
          <h1 id="cp-header">Class preview</h1>
          <div className="cc-table">
            <table>
              <tbody>
                {classroom.layout.map((row, rIdx) => (
                  <tr key={rIdx}>
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

                      const seatStart =
                        row
                          .slice(0, cIdx)
                          .reduce(
                            (acc, curr) => (curr !== null ? acc + curr : acc),
                            0
                          ) +
                        classroom.layout
                          .slice(0, rIdx)
                          .flat()
                          .reduce(
                            (acc, curr) => (curr !== null ? acc + curr : acc),
                            0
                          ) +
                        1;

                      return (
                        <td
                          key={cIdx}
                          className="cc-table-td"
                          style={{ backgroundColor: "#EBEBEB" }}
                        >
                          <div className="seats-inside">
                            {Array.from({ length: cell }, (_, i) => (
                              <div key={i} className="seat">
                                {seatStart + i}
                              </div>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
