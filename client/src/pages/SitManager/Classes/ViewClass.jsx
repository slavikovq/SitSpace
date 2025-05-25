import "../../../scss/ViewClass.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";

export default function ViewClass() {
  return (
    <SitManagerView headerText="Class (Class_name)">
      <div className="c-body">
        <div className="class-info">
          <div className="class-details">
            <h1>Class information</h1>
            <div>
              <span>Class ID:</span> #1
            </div>
            <div>
              <span>Number of seats:</span> 28
            </div>
          </div>

          <div className="button-class">
            <button className="class-edit-btn">Edit class</button>
            <button className="class-delete-btn">Delete class</button>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
