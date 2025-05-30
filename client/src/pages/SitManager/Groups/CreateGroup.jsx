import "../../../scss/Groups.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import trashBig from "../../../assets/icons/trashBig.png";
import { createGroup } from "../../../models/group";
import { useNavigate } from "react-router-dom";
import { alert } from "../../../utils/sweetAlert";

const defaultStudent = {
  student_id: 1,
  student_name: "",
};

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [students, setStudents] = useState([defaultStudent]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Group • SitSpace";
    setStudents([{ student_id: 1, student_name: "" }]);
    setGroupName("");
  }, []);

  const sendData = async () => {
    const res = await createGroup({ group_name: groupName, students: students})
    if(res.status === 201){
      alert("success", "Group succesfully created.")
      setStudents([{student_id: 1, student_name: ""}]);
      return navigate("/sitManager/groups")
    }
    if(res.status === 500){
      alert("error", `${res.message}`);
    }
  }

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

  const handleCancelButton = (e) => {
    e.preventDefault();
    setStudents([{student_id: 1, student_name: ""}]);
    setGroupName("");
  }

  const handleCreateButton = (e) => {
    e.preventDefault();

    const requiredInputs = document.querySelectorAll("input[required], select[required]");
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
  }

  return (
    <SitManagerView headerText="Create group" pageNow={"createGroup"}>
      <div className="g-body">
        <div className="group-info">
          <div className="group-details">
            <h1>Group information</h1>
            <div className="input-section">
              <input type="text" id="b" placeholder="Group name" value={groupName} required onChange={(e) => setGroupName(e.target.value)}/>
            </div>
            <p><span style={{color: "red"}}>*</span> <span style={{fontWeight: "300"}}>Group name can be only 20 characters length</span></p>
          </div>

          <div className="button-group">
            <button className="group-edit-btn" onClick={handleCreateButton}>Create group</button>
            <button className="group-delete-btn" onClick={handleCancelButton}>Cancel</button>
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
