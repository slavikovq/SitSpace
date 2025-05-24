import { Link } from "react-router-dom";
import "../../scss/WhatPeopleAreSaying.scss";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useState } from "react";
import { getAllReviews } from "../../models/review";
import LoadingPage from "../LoadingPage/LoadingPage";
import NotFound from "../NotFound/NotFound";

export default function WhatPeopleAreSaying() {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    const load = async () => {
      const res = await getAllReviews();
      if (res.status === 200) {
        setReviews(res.payload);
        setIsLoading(false);
      }
      if (res.status === 404 || res.status === 500) setIsLoading(null);
    };
    load();
  }, []);

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

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
            {reviews.slice(0, 4).reverse().map((review, i) => (
              <ReviewCard review={review} key={i}/>
            ))}
          </div>
          <div className="wps-button">
            <Link to={"/reviews"} className="all-reviews-button">
              Show all reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
