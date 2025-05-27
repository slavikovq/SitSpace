import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function CreateSeatingPlan() {
  useEffect(() => {
    document.title = "Create seating plan • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Create seating plan" pageNow={"createPlan"}>
      <div className="sp-body">

      </div>
    </SitManagerView>
  );
}
