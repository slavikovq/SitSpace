import SeatingPreviewCard from "../../../components/SeatingPreviewCard/SeatingPreviewCard";
import "../../../scss/SeatingPreview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";

export default function SeatingPreview() {
  return (
    <SitManagerView headerText="Seating Preview">
      <div className="sp-body">
        <SeatingPreviewCard />
      </div>
    </SitManagerView>
  );
}
