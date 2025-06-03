import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getUserStats } from "../../models/user";
import { getPlanStats } from "../../models/plan";
import { getClassroomStats } from "../../models/class";
import people from "../../assets/img/about-us.png";
import "../../scss/AboutUs.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import NotFound from "../NotFound/NotFound";

export default function AboutUs() {
  const [userStats, setUserStats] = useState({});
  const [planStats, setPlanStats] = useState({});
  const [classroomStats, setClassroomStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      const userData = await getUserStats();
      const planData = await getPlanStats();
      const classroomData = await getClassroomStats();

      console.log(userData)
      console.log(planData)
      console.log(classroomData)
    
      if(userData.status === 200 && planData.status === 200 && classroomData.status === 200){
        setClassroomStats(classroomData.payload);
        setUserStats(userData.payload);
        setPlanStats(planData.payload);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

    if (isLoading) return <LoadingPage />;
  
    if (isLoading === null) return <NotFound />;

  return (
    <>
      <div id="Statistics">
        <div className="statistics-card">
          <div>
            <h1>
              <CountUp start={0} end={userStats} duration={2} />
            </h1>
            <p>Registered Users</p>
          </div>
          <div>
            <h1>
              <CountUp start={0} end={planStats} duration={2} />
            </h1>
            <p>Active Seating Plans</p>
          </div>
          <div>
            <h1>
              <CountUp start={0} end={classroomStats} duration={2} />
            </h1>
            <p>Classrooms Created</p>
          </div>
        </div>
      </div>
      
      <div id="AboutUs">
        <div className="main">
          <div className="about-content">
            <h6>—SitSpace</h6>
            <h1>About us</h1>
            <p>
              We are an innovative tech company offering a simple and efficient tool for designing furniture layouts, like Figma,
              but for tables and chairs. Our platform is perfect for classrooms, offices, events,
              or any space where thoughtful arrangement matters. With an intuitive, real-time collaborative editor,
              users can easily plan and customize room layouts to fit their needs. Our mission is to save time,
              simplify spatial planning, and improve the way people organize their environments.
            </p>
          </div>
          <div>
            <img src={people} alt="" className="people" />
          </div>
        </div>
      </div>
    </>
  );
}
