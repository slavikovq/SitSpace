import SeatingPreviewCard from "../../../components/SeatingPreviewCard/SeatingPreviewCard";
import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getAllUserPlans } from "../../../models/plan";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";

export default function SeatingPlans() {
  const [plans, setPlans] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Seating Plans • SitSpace";

    const load = async () => {
      const res = await getAllUserPlans();
      if(res.status === 200){
        setPlans(res.payload);
        setIsLoading(false);
      } 
      if(res.status === 404 || res.status === 500){
        setIsLoading(null)
      } 
    }

    load();
  }, []);

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Seating Plans" pageNow={"seatingPlans"}>
      <div className="sp-body">
        {plans.map((plan, index) => (
          <SeatingPreviewCard plan={plan} key={index}/>
        ))}
      </div>
    </SitManagerView>
  );
}
