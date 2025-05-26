import GroupCard from "../../../components/GroupCard/GroupCard";
import "../../../scss/Groups.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getAllUserGroups } from "../../../models/group";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";

export default function ViewAllGroups() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Groups • SitSpace";

    const load = async () => {
      const res = await getAllUserGroups();
      if(res.status === 200){
        setGroups(res.payload)
        setIsLoading(false);
      }
      if(res.status === 500){
        setIsLoading(null);
      }
    }

    load();
  }, []);

  if(isLoading) return <LoadingPage />

  if(isLoading === null) return <NotFound />
 
  return (
    <SitManagerView headerText="Groups" pageNow={"groups"}>
      <div className="g-body" id="flex">
        {groups.length === 0 ? <p id="noerr">No groups created yet.</p> : ""} 
        {groups.map((group, index) => (
          <GroupCard group={group} key={index}/>
        ))}
      </div>
    </SitManagerView>
  );
}
