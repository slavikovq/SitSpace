import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function UpdateSeatingPlan() {
  useEffect(() => {
    document.title = "Update Seating Plan • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Update Seating Plan" pageNow={"createPlan"}>
      <div className="sp-body">
        <div className="scp-card">
          <h3>Group information</h3>
          <select name="" id="">
          <option value="" disabled selected>Select Group...</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          </select>
          <div className="scp-details">
            <div>
              <span>Group ID:</span> 25
            </div>
            <div>
              <span>Number of students:</span> 30
            </div>
          </div>
        </div>
        <div className="scp-card">
          <h3>Class information</h3>
          <select name="" id="">
          <option value="" disabled selected>Select Class...</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option>  
          <option value="">asdasd</option> 
          </select>
          <div className="scp-details">
            <div>
              <span>Class ID:</span> 25
            </div>
            <div>
              <span>Number of seats:</span> 30
            </div>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
