import ClassCard from "../../../components/ClassCard/ClassCard";
import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getAllUserClasses } from "../../../models/class";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";


export default function ViewAllClasses() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Classes • SitSpace";

    const load = async () => {
      const res = await getAllUserClasses();
      if(res.status === 200){
        setClasses(res.payload)
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
    <SitManagerView headerText="Classes" pageNow={"classes"}>
      <div className="sp-body">
        {classes.length === 0 ? <p id="noerr">No classes created yet.</p> : ""} 
        {classes.map((classroom, index) => (
          <ClassCard classroom={classroom} key={index} />
        ))}
      </div>
    </SitManagerView>
  );
}
