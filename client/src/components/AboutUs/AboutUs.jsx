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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              quisquam accusantium eligendi dolores repellat voluptatem
              consectetur eum beatae. Ratione rem expedita quis. Ullam possimus
              ab mollitia dolorum rerum, ducimus officia.
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
