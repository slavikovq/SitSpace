import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function ViewSeatingPlan() {
  useEffect(() => {
    document.title = "Seating plan • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Seating plan (name)" pageNow={"seatingPlans"}>
      <div className="sp-body">

      </div>
    </SitManagerView>
  );
}
