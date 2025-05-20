import people from "../../assets/img/about-us.png";
import "../../scss/AboutUs.scss";

export default function AboutUs() {
  return (
    <>
    
      <div id="Statistics">
        <div className="statistics-card">
          <div>
            <h1>331</h1>
            <p>Registered Users</p>
          </div>
          <div>
            <h1>2,486</h1>
            <p>Active Seating Plans</p>
          </div>
          <div>
            <h1>865</h1>
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
