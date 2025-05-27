import SeatingPreviewCard from "../../../components/SeatingPreviewCard/SeatingPreviewCard";
import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function SeatingPlans() {
  useEffect(() => {
    document.title = "Seating Plans • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Seating Plans" pageNow={"seatingPlans"}>
      <div className="sp-body">
        <SeatingPreviewCard />
      </div>
    </SitManagerView>
  );
}
