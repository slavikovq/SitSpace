import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getAllUserGroups } from "../../../models/group";
import { getAllUserClasses } from "../../../models/class";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";

export default function CreateSeatingPlan() {
  const [groups, setGroups] = useState();
  const [classrooms, setClassrooms] = useState();

  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

  const selectGroup = (id) => {
    const result = groups.flat().find((item) => item._id === id);
    setSelectedGroup(result);
  };

  const selectClass = (id) => {
    const result = classrooms.flat().find((item) => item._id === id);
    setSelectedClass(result);
  };

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

          <div className="classroom-preview">
            <div id="cp-header"></div>
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
                        
                          return (
                            <td
                              key={cIdx}
                              className="cc-table-td"
                              style={{ backgroundColor: "#EBEBEB" }}
                            >
                              <div className="seats-inside">
                                {Array.from({ length: cell }, (_, i) => (
                                  <div key={i} className="seat">
                                    <select className="cc-table-select">
                                      <option value="" selected>
                                        Empty seat
                                      </option>
                                      {!selectedGroup && (
                                        <option value="" disabled>
                                          No group selected yet.
                                        </option>
                                      )}
                                      {selectedGroup?.students.map(
                                        (student, index) => (
                                          <option key={index}>
                                            {student.student_name}
                                          </option>
                                        )
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
