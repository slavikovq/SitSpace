import ClassCard from "../../../components/ClassCard/ClassCard";
import "../../../scss/SeatingPreview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";

export default function ViewAllClasses() {
  return (
    <SitManagerView headerText="Classes">
      <div className="sp-body">
        <ClassCard />
      </div>
    </SitManagerView>
  );
}
