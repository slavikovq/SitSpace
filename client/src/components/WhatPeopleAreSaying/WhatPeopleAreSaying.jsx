import "../../scss/WhatPeopleAreSaying.scss";
import ReviewCard from "../ReviewCard/ReviewCard";

export default function WhatPeopleAreSaying() {
  return (
    <>
      <div id="WhatPeopleAreSaying">
        <div className="wps-content">
          <div>
            <div className="wps-title">
              <h6>—SitSpace—</h6>
              <h1>What people are saying</h1>
            </div>
          </div>
          <div className="wps-reviews">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
          <div className="wps-button">
            <button className="all-reviews-button">Show all reviews</button>
          </div>
        </div>
      </div>
    </>
  );
}
