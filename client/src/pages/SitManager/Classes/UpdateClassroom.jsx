import "../../../scss/Classes.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function UpdateClassroom() {
  useEffect(() => {
    document.title = "Update Classroom • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Update Classroom" pageNow={"classes"}>
      <div className="cc-body">
        <div className="cc-fRow">
          <div>
            <div>
              <h1>Classroom information</h1>
              <input type="text" name="" id="" placeholder="Classroom name" />
            </div>
            <div className="cc-buttons">
              <button id="cc-cc-btn">Update Classroom</button>
              <button id="cc-cancel-btn">Cancel</button>
            </div>
          </div>
          <div>
            <div>
              <h1>Classroom layout</h1>
              <input
                type="text"
                name=""
                id=""
                placeholder="Number of columns"
              />
            </div>
            <button className="cc-add-btn">Add</button>
          </div>
        </div>
        <div className="cc-view">
          <h1>Classroom view</h1>
          <div className="cc-sRow">
            <div>
              <div>
                <input type="text" placeholder="Number of table rows" />
              </div>
              <button className="cc-add-btn">Add</button>
            </div>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
