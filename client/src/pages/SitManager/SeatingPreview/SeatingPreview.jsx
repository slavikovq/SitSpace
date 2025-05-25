import SeatingPreviewCard from "../../../components/SeatingPreviewCard/SeatingPreviewCard";
import "../../../scss/SeatingPreview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function SeatingPreview() {
  useEffect(() => {
    document.title = "Seating Preview • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Seating Preview" pageNow={"seatingPreview"}>
      <div className="sp-body">
        <SeatingPreviewCard />
      </div>
    </SitManagerView>
  );
}
