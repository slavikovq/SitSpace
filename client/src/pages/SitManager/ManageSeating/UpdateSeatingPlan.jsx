import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUserGroups } from "../../../models/group";
import { getAllUserClasses } from "../../../models/class";
import { getUserPlanById, updatePlan } from "../../../models/plan";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";
import { alert } from "../../../utils/sweetAlert";

export default function UpdateSeatingPlan() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignedSeats, setAssignedSeats] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Update seating plan • SitSpace";

    const load = async () => {
      const [resGroups, resClassrooms, resPlan] = await Promise.all([
        getAllUserGroups(),
        getAllUserClasses(),
        getUserPlanById(id),
      ]);

      if (resGroups.status === 200 && resClassrooms.status === 200 && resPlan.status === 200) {
        const plan = resPlan.payload;
        const classroom = resClassrooms.payload
          .flat()
          .find((c) => c._id === plan.class_id);
        const group = resGroups.payload
          .flat()
          .find((g) => g._id === plan.group_id);

        const assigned = plan.plan;

        const usedStudentNames = assigned.flatMap((row) =>
          row?.flatMap((cell) => (cell ? cell.filter(Boolean) : []))
        );

        const available = group.students.filter(
          (s) => !usedStudentNames.includes(s.student_name)
        );

        setSelectedClass(classroom);
        setSelectedGroup(group);
        setAssignedSeats(assigned);
        setAvailableStudents(available);
        setIsLoading(false);
      } else {
        setIsLoading(null);
      }
    };

    load();
  }, []);

  const changeSeatAssignment = (rowIdx, colIdx, seatIdx, e) => {
    const selectedStudentName = e.target.value;

    setAssignedSeats((prev) => {
      const newAssigned = prev.map((r) => r.slice());

      if (!newAssigned[rowIdx] || !newAssigned[rowIdx][colIdx]) return prev;

      const seats = [...newAssigned[rowIdx][colIdx]];
      const oldStudent = seats[seatIdx];

      seats[seatIdx] = selectedStudentName === "" ? null : selectedStudentName;
      newAssigned[rowIdx][colIdx] = seats;

      setAvailableStudents((prevAvailable) => {
        let updatedAvailable = [...prevAvailable];

        if (oldStudent && oldStudent !== selectedStudentName) {
          const studentToReturn = selectedGroup.students.find(
            (s) => s.student_name === oldStudent
          );
          if (
            studentToReturn &&
            !updatedAvailable.find((s) => s.student_name === oldStudent)
          ) {
            updatedAvailable.push(studentToReturn);
          }
        }

        if (selectedStudentName && selectedStudentName !== oldStudent) {
          updatedAvailable = updatedAvailable.filter(
            (s) => s.student_name !== selectedStudentName
          );
        }

        return updatedAvailable;
      });

      return newAssigned;
    });
  };

  const sendData = async () => {
    const res = await updatePlan(id, {
      class_id: selectedClass._id,
      group_id: selectedGroup._id,
      plan: assignedSeats,
    });

    if (res.status === 200) {
      alert("success", "Plan successfully updated.");
      return navigate("/sitManager/seatingPlans");
    }

    alert("error", `${res.message}`);
  };

  const handleButton = (e) => {
    e.preventDefault();
    if (availableStudents.length > 0) {
      alert("error", "You have to assign a seat to all the students.");
    } else {
      sendData();
    }
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    navigate("/sitManager/seatingPlans");
  };

  if (isLoading) return <LoadingPage extra={"You can't modify this seating plan. Because you deleted the group or class that was assigned to this seating plan."} />;

  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Update seating plan" pageNow={"seatingPlans"}>
      <div className="sp-body">
        <div className="sp-content">
          <div className="sp-content-body">
            <div className="scp-card">
              <h3>Group information</h3>
              <div className="scp-details">
                <div>
                  <span>Group:</span> {selectedGroup.group_name}
                </div>
                <div>
                  <span>Number of students:</span>{" "}
                  {selectedGroup.students.length}
                </div>
              </div>
            </div>
            <div className="scp-card">
              <h3>Class information</h3>
              <div className="scp-details">
                <div>
                  <span>Classroom: </span> {selectedClass.class_name}
                </div>
                <div>
                  <span>Number of seats: </span> {selectedClass.total_seats}
                </div>
              </div>
            </div>
          </div>
          <div className="button-group">
            <button className="group-edit-btn" onClick={handleButton}>
              Update plan
            </button>
            <button className="group-delete-btn" onClick={handleCancelButton}>
              Cancel
            </button>
          </div>
          <div className="classroom-preview">
            <div id="cp-header">
              <h1>{selectedClass?.class_name}</h1>
            </div>
            <div className="cc-table">
              <table id="maleft">
                <thead>
                  <tr>
                    <th></th>
                    {selectedClass?.layout[0].map((_, cIdx) => (
                      <th key={cIdx}>{String.fromCharCode(65 + cIdx)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedClass?.layout.map((row, rIdx) => (
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
                          assignedSeats?.[rIdx]?.[cIdx] ||
                          Array(cell).fill(null);

                        return (
                          <td
                            key={cIdx}
                            className="cc-table-td"
                            style={{ backgroundColor: "#EBEBEB" }}
                          >
                            <div className="seats-inside">
                              {seatsInCell.map((studentName, seatIdx) => (
                                <div key={seatIdx} className="seat">
                                  <select
                                    className="cc-table-select"
                                    value={studentName || ""}
                                    onChange={(e) =>
                                      changeSeatAssignment(
                                        rIdx,
                                        cIdx,
                                        seatIdx,
                                        e
                                      )
                                    }
                                  >
                                    <option value="">Empty seat</option>
                                    {availableStudents.map((student, index) => (
                                      <option
                                        key={index}
                                        value={student.student_name}
                                      >
                                        {student.student_name}
                                      </option>
                                    ))}
                                    {studentName &&
                                      !availableStudents.find(
                                        (s) => s.student_name === studentName
                                      ) && (
                                        <option value={studentName}>
                                          {studentName}
                                        </option>
                                      )}
                                  </select>
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
    </SitManagerView>
  );
}
