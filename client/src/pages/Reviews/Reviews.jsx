import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Footer from "../../components/Footer/Footer";
import "../../scss/Reviews.scss";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { getAllReviews } from "../../models/review";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import NotFound from "../../components/NotFound/NotFound";

export default function Reviews() {
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
      <ScrollToTop />
      <div className="reviews">
        <Navbar />
        <div className="reviews-title">
          <h1>What people are saying</h1>
          <h2>Our reviews</h2>
        </div>
      </div>
      <div className="reviews-cards">
        {reviews
          .map((review, i) => (
            <ReviewCard review={review} key={i} />
          ))}
      </div>
      <Footer />
    </>
  );
}
