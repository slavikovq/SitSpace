import { useEffect, useState } from "react";

import "../../../scss/ManageReview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";

import starEmpty from "../../../assets/icons/starEmpty.svg";
import starFull from "../../../assets/icons/starFull.svg";
import { alert } from "../../../utils/sweetAlert";
import { createReview } from "../../../models/review";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useReview } from "../../../context/ReviewProvider";

export default function CreateReview() {
  const { user } = useAuth();
  const { refetchReview } = useReview();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Review • SitSpace";
  }, []);

  const handleStarClick = (i) => {
    setRating(i + 1);
  };

  const sendData = async () => {
    if (rating > 0 && reviewText != "") {
      const res = await createReview({
        author_id: user._id,
        rating: rating,
        text: reviewText,
      });
      if (res.status === 201) {
        alert("success", "Your review has been created.");
        await refetchReview();
        navigate(`/review/${res.payload._id}`);
      }
      if (res.status === 400) {
        alert("error", `${res.message}`);
      }
    } else {
      alert("error", "All fields are required.");
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    console.log({ auhtor_id: user._id, rating: rating, text: reviewText });
    sendData();
  };

  return (
    <SitManagerView headerText="Write a review" pageNow={"review"}>
      <div className="sp-body">
        <div className="create-review-box">
          <div className="review-box-header">
            <h3>Review</h3>
          </div>
          <textarea
            className="review-box-area"
            placeholder="Write your review here..."
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <div className="review-footer">
          <div className="review-rating">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? starFull : starEmpty}
                onClick={() => handleStarClick(index)}
              />
            ))}
            <p style={{ textAlign: "center" }}>
              Your rating: {rating.toFixed(1)}
            </p>
          </div>
          <button onClick={handleButton}>Send review</button>
        </div>
      </div>
    </SitManagerView>
  );
}
