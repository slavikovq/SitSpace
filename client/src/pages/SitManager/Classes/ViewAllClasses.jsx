import ClassCard from "../../../components/ClassCard/ClassCard";
import "../../../scss/SeatingPreview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function ViewAllClasses() {
  useEffect(() => {
    document.title = "Classes • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Classes" pageNow={"classes"}>
      <div className="sp-body">
        <ClassCard />
      </div>
    </SitManagerView>
  );
}
