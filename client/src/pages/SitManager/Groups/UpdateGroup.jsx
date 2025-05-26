import "../../../scss/Groups.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import trashBig from "../../../assets/icons/trashBig.png";
import { getUserGroupById, updateGroup } from "../../../models/group";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";
import { alert } from "../../../utils/sweetAlert";

export default function UpdateGroup() {
  const { id } = useParams();
  const [groupName, setGroupName] = useState();
  const [students, setStudents] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Group • SitSpace";

    const load = async () => {
      const res = await getUserGroupById(id);
      if (res.status === 200) {
        setGroupName(res.payload.group_name);
        setStudents(res.payload.students);
        setIsLoading(false);
      }
      if (res.status === 404 || res.status === 500) {
        setIsLoading(null);
      }
    };

    load();
  }, []);

  const sendData = async () => {
    const res = await updateGroup(id, {
      group_name: groupName,
      students: students,
    });
    if (res.status === 200) {
      alert("success", "Group succesfully updated.");
      return navigate("/sitManager/groups");
    }
    if (res.status === 500) {
      alert("error", `${res.message}`);
    }
  };

  const addStudent = () => {
    const newStudent = {
      student_id: students.length + 1,
      student_name: "",
    };
    setStudents([...students, newStudent]);
  };

  const removeStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const handleInputChange = (e, index) => {
    const updated = [...students];
    updated[index][e.target.name] = e.target.value;
    setStudents(updated);
  };

  const handleUpdateButton = (e) => {
    e.preventDefault();

    const requiredInputs = document.querySelectorAll(
      "input[required], select[required]"
    );
    const emptyFields = Array.from(requiredInputs).filter(
      (input) => !input.value.trim()
    );

    if (emptyFields.length > 0) {
      alert("error", "All fields are required.");
      return;
    }

    if (groupName.length > 20) {
      alert("error", "Group name is too long.");
      return;
    }

    sendData();
  };

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView
      headerText="Update group (group_name)"
      pageNow={"createGroup"}
    >
      <div className="g-body">
        <div className="group-info">
          <div className="group-details">
            <h1>Group information</h1>
            <div className="input-section">
              <input
                type="text"
                id="b"
                placeholder="Group name"
                onChange={(e) => setGroupName(e.target.value)}
                defaultValue={groupName}
              />
            </div>
          </div>

          <div className="button-group">
            <button className="group-edit-btn" onClick={handleUpdateButton}>
              Update group
            </button>
            <button
              className="group-delete-btn"
              onClick={() => navigate("/sitManager/groups")}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="group-preview">
          <h1>Students list</h1>
          {students.map((student, index) => (
            <div className="input-section" key={index}>
              <input
                type="number"
                id="s"
                placeholder="ID"
                min={1}
                value={student.student_id}
                name="student_id"
                required
                onChange={(e) => handleInputChange(e, index)}
              />
              <input
                type="text"
                id="b"
                placeholder="Student name"
                value={student.student_name}
                name="student_name"
                required
                onChange={(e) => handleInputChange(e, index)}
              />
              {students.length > 1 ? (
                <img
                  src={trashBig}
                  alt="Delete"
                  onClick={() => removeStudent(index)}
                />
              ) : (
                ""
              )}
            </div>
          ))}
          <div className="button-group">
            <button className="group-edit-btn" onClick={addStudent}>
              Add student
            </button>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
