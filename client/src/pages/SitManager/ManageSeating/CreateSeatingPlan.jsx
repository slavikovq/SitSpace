import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getAllUserGroups } from "../../../models/group";
import { getAllUserClasses } from "../../../models/class";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";
import { alert } from "../../../utils/sweetAlert";
import { createPlan } from "../../../models/plan";
import { useNavigate } from "react-router-dom";

export default function CreateSeatingPlan() {
  const [groups, setGroups] = useState();
  const [classrooms, setClassrooms] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [assignedSeats, setAssignedSeats] = useState({});
  const [availableStudents, setAvailableStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create seating plan • SitSpace";

    const load = async () => {
      const resGroups = await getAllUserGroups();
      const resClassrooms = await getAllUserClasses();

      if (resGroups.status === 200 && resClassrooms.status) {
        setGroups(resGroups.payload);
        setClassrooms(resClassrooms.payload);
        setIsLoading(false);
      }
      if (resGroups.status === 500 || resClassrooms.status === 500) {
        setIsLoading(null);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const assigned = selectedClass.layout.map((row) =>
        row.map((seatCount) => {
          if (seatCount === null) return null;
          return Array(seatCount).fill(null); 
        })
      );
      setAssignedSeats(assigned);
      setAvailableStudents([...(selectedGroup?.students || [])]);
    }
  }, [selectedClass, selectedGroup]);

  const sendData = async () => {
    const res = await createPlan({class_id: selectedClass._id, group_id: selectedGroup._id, plan: assignedSeats})
    if(res.status === 201){
      alert("success", "Plan succesfully created.")
      return navigate("/sitManager/seatingPlans")
    }
    if(res.status === 500){
      alert("error", `${res.message}`);
    }
  }

  const selectGroup = (id) => {
    const result = groups.flat().find((item) => item._id === id);
    if(selectedClass){
      if(result.students.length > selectedClass.total_seats){
        alert("error", "This group is too large for this classroom.")
      } else{
        setSelectedGroup(result);
      }
    } else{
      setSelectedGroup(result);
    }
  };

  const selectClass = (id) => {
    const result = classrooms.flat().find((item) => item._id === id);
    if(selectedGroup){
      if(result.total_seats < selectedGroup.students.length){
        alert("error", "This classroom is too small for this group.")
      } else{
        setSelectedClass(result);
      }
    } else{
      setSelectedClass(result);
    }
  };

  const changeSeatAssignment = (rowIdx, colIdx, seatIdx, e) => {
    const selectedStudentName = e.target.value;

    setAssignedSeats((prev) => {
      const newAssigned = prev.map((r) => r.slice());

      if (!newAssigned[rowIdx] || !newAssigned[rowIdx][colIdx]) return prev;

      const seats = [...newAssigned[rowIdx][colIdx]];
      const oldStudent = seats[seatIdx];

      seats[seatIdx] = selectedStudentName === "" ? null : selectedStudentName;
      newAssigned[rowIdx][colIdx] = seats;

      setAvailableStudents(prevAvailable => {
        let updatedAvailable = [...prevAvailable];
      
        if (oldStudent && oldStudent !== selectedStudentName) {
          const studentToReturn = selectedGroup.students.find(s => s.student_name === oldStudent);
          if (studentToReturn && !updatedAvailable.find(s => s.student_name === oldStudent)) {
            updatedAvailable.push(studentToReturn);
          }
        }
      
        if (selectedStudentName !== "" && selectedStudentName !== oldStudent) {
          updatedAvailable = updatedAvailable.filter(s => s.student_name !== selectedStudentName);
        }
      
        return updatedAvailable;
      });


      return newAssigned;
    });
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setSelectedClass(null);
    setSelectedGroup(null);
    setAssignedSeats({});
    setAvailableStudents([])
  }

  const handleButton = (e) => {
    e.preventDefault();
    if(availableStudents.length > 0){
      alert("error", "You have to assign a seat to all the students.")
    } else{
      sendData();
    }
  }

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Create seating plan" pageNow={"createPlan"}>
      <div className="sp-body">
        <div className="sp-content">
          <div className="sp-content-body">
            <div className="scp-card">
              <h3>Group information</h3>
              <select onChange={(e) => selectGroup(e.target.value)}>
                <option value="" disabled selected>
                  Select Group...
                </option>
                {groups.length === 0 ? (
                  <option disabled>No groups created yet.</option>
                ) : null}
                {groups.map((group, index) => (
                  <option key={index} value={group._id}>
                    {group.group_name}
                  </option>
                ))}
              </select>
              {selectedGroup && (
                <div className="scp-details">
                  <div>
                    <span>Group ID:</span> #{selectedGroup.group_id}
                  </div>
                  <div>
                    <span>Number of students:</span>{" "}
                    {selectedGroup.students.length}
                  </div>
                </div>
              )}
            </div>
            <div className="scp-card">
              <h3>Class information</h3>
              <select onChange={(e) => selectClass(e.target.value)}>
                <option value="" disabled selected>
                  Select Classroom...
                </option>
                {classrooms.length === 0 ? (
                  <option disabled>No classrooms created yet.</option>
                ) : null}
                {classrooms.map((classroom, index) => (
                  <option key={index} value={classroom._id}>
                    {classroom.class_name}
                  </option>
                ))}
              </select>
              {selectedClass && (
                <div className="scp-details">
                  <div>
                    <span>Classroom ID:</span> #{selectedClass.class_id}
                  </div>
                  <div>
                    <span>Number of seats:</span> {selectedClass.total_seats}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="button-group">
            <button className="group-edit-btn" onClick={handleButton}>Create plan</button>
            <button className="group-delete-btn" onClick={handleCancelButton}>Cancel</button>
          </div>
          <div className="classroom-preview">
            <div id="cp-header">
              <h1>{selectedClass?.class_name}</h1>
            </div>
            <div className="cc-table">
              {selectedClass && (
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
                                      <option value="" style={{color: "red"}}>Empty seat</option>
                                      {availableStudents.map(
                                        (student, index) => (
                                          <option
                                            key={index}
                                            value={student.student_name}
                                          >
                                            {student.student_name}
                                          </option>
                                        )
                                      )}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
