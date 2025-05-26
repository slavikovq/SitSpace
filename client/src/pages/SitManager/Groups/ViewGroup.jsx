import "../../../scss/Groups.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getUserGroupById } from "../../../models/group";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";
import Swal from "sweetalert2";
import { deleteGroup } from "../../../models/group";
import { alert } from "../../../utils/sweetAlert";

export default function ViewGroup() {
  const { id } = useParams();
  const [group, setGroup] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Group • SitSpace";

    const load = async () => {
      const res = await getUserGroupById(id);
      if (res.status === 200) {
        setGroup(res.payload);
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
          return navigate("/sitManager/groups")
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
      headerText={`Group (${group.group_name})`}
      pageNow={"groups"}
    >
      <div className="g-body">
        <div className="group-info">
          <div className="group-details">
            <h1>Group information</h1>
            <div>
              <span>Group ID:</span> #{group.group_id}
            </div>
            <div>
              <span>Number of students:</span> {group.students.length}
            </div>
          </div>

          <div className="button-group">
            <button className="group-edit-btn" onClick={() => navigate(`/sitManager/updateGroup/${group._id}`)}>Edit group</button>
            <button className="group-delete-btn" onClick={deleteConfirm}>Delete group</button>
          </div>
        </div>

        <div className="group-preview">
          <h1>Group preview</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student name</th>
              </tr>
            </thead>
            <tbody>
              {group.students.map((student, index) => (
                <tr key={index}>
                  <td>{student.student_id}</td>
                  <td>{student.student_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SitManagerView>
  );
}
