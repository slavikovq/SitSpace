import Navbar from "../../components/Navbar/Navbar";
import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Footer from "../../components/Footer/Footer"
import "../../scss/Reviews.scss";

export default function Reviews() {
  return (
    <>
      <div className="reviews">
        <Navbar />
        <div className="reviews-title">
          <h1>What people are saying</h1>
          <h2>Our reviews</h2>
        </div>
      </div>
      <div className="reviews-cards">
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
                <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
                <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
      </div>
      <Footer/>
    </>
  );
}
