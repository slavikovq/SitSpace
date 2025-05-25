import GroupCard from "../../../components/GroupCard/GroupCard";
import "../../../scss/SeatingPreview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";

export default function ViewAllGroups() {
  return (
    <SitManagerView headerText="Groups">
      <div className="sp-body">
        <GroupCard />
      </div>
    </SitManagerView>
  );
}
