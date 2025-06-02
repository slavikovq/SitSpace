import SeatingPreviewCard from "../../../components/SeatingPreviewCard/SeatingPreviewCard";
import "../../../scss/ManageSeating.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";
import { useEffect, useState } from "react";
import { getAllUserPlans, getAllSharedPlans } from "../../../models/plan";
import { getAllUserShares } from "../../../models/share";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import NotFound from "../../../components/NotFound/NotFound";

export default function SeatingPlans() {
  const [plans, setPlans] = useState([]);
  const [sharedGroups, setSharedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Seating Plans • SitSpace";

    const load = async () => {
      const res = await getAllUserPlans();
      const sharesRes = await getAllUserShares();

      if (res.status === 200) setPlans(res.payload);
      if (sharesRes.status === 200 && Array.isArray(sharesRes.payload)) {
        const authors = sharesRes.payload;
        const allSharedPlans = await Promise.all(
          authors.map(async (share) => {
            const sharedRes = await getAllSharedPlans(share.author_id);
            if (sharedRes.status === 200) {
              return {
                author_f_name: share.author_f_name,
                author_l_name: share.author_l_name,
                author_email: share.author_email,
                plans: sharedRes.payload || [],
              };
            }
            return null;
          })
        );

        const validGroups = allSharedPlans.filter(Boolean);
        setSharedGroups(validGroups);
      }

      if (
        (res.status === 404 || res.status === 500) &&
        (sharesRes.status === 404 || sharesRes.status === 500)
      ) {
        setIsLoading(null);
        return;
      }

      setIsLoading(false);
    };

    load();
  }, []);

  if (isLoading) return <LoadingPage />;
  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Seating Plans" pageNow={"seatingPlans"}>
      <div style={{overflow: "auto"}}>
        <h2 style={{ marginLeft: "20px", marginTop: "20px" }}>My seating plans</h2>
        <div className="sp-body">
          {plans.length > 0 ? (
            plans.map((plan, index) => (
              <SeatingPreviewCard plan={plan} key={index} view={"normal"} />
            ))
          ) : (
            <p style={{color: "#aaa"}}>You have no seating plans.</p>
          )}
        </div>

        {sharedGroups.map((group, index) => (
          <div key={index}>
            <h2 style={{ marginLeft: "20px" }}>
              Shared by {group.author_f_name} {group.author_l_name} (
              {group.author_email})
            </h2>
            <div className="sp-body">
              {group.plans.map((plan, idx) => (
                <SeatingPreviewCard plan={plan} key={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SitManagerView>
  );
}
