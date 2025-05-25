import GroupCard from "../../../components/GroupCard/GroupCard";
import "../../../scss/SeatingPreview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect } from "react";

export default function ViewAllGroups() {
  useEffect(() => {
    document.title = "Groups • SitSpace";
  }, []);

  return (
    <SitManagerView headerText="Groups" pageNow={"groups"}>
      <div className="sp-body">
        <GroupCard />
      </div>
    </SitManagerView>
  );
}
