import "../../../scss/Groups.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function ViewGroup() {
  useEffect(() => {
    document.title = "Group • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Group (Group_name)" pageNow={"groups"}>
      <div className="g-body">
        <div className="group-info">
          <div className="group-details">
            <h1>Group information</h1>
            <div>
              <span>Class ID:</span> #1
            </div>
            <div>
              <span>Number of students:</span> 28
            </div>
          </div>

          <div className="button-group">
            <button className="group-edit-btn">Edit group</button>
            <button className="group-delete-btn">Delete group</button>
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
              <tr>
                <td>1</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>#</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>#</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>#</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>#</td>
                <td>Student name</td>
              </tr>
              <tr>
                <td>#</td>
                <td>Student name</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SitManagerView>
  );
}
