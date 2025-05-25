import "../../../scss/Groups.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";
import trashBig from "../../../assets/icons/trashBig.png";

export default function CreateGroup() {
  useEffect(() => {
    document.title = "Create Group • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Groups" pageNow={"createGroup"}>
      <div className="g-body">
        <div className="group-info">
          <div className="group-details">
            <h1>Group information</h1>
            <div className="input-section">
              <input type="text" id="b" placeholder="Group name" />
            </div>
          </div>

          <div className="button-group">
            <button className="group-edit-btn">Create group</button>
            <button className="group-delete-btn">Cancel</button>
          </div>
        </div>

        <div className="group-preview">
          <h1>Students list</h1>
          <div className="input-section">
            <input type="number" id="s" placeholder="ID" min={1} />
            <input type="text" id="b" placeholder="Student name" />
            <img src={trashBig} alt="Delete" />
          </div>
          <div className="button-group">
            <button className="group-edit-btn">Add student</button>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
