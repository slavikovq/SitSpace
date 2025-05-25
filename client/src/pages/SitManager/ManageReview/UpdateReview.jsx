import { useEffect, useState } from "react";

import "../../../scss/ManageReview.scss";
import SitManagerView from "../../../components/SitManagerView/SitManagerView";

import starEmpty from "../../../assets/icons/starEmpty.svg";
import starFull from "../../../assets/icons/starFull.svg";
import { getUserReview, updateReview } from "../../../models/review";
import NotFound from "../../../components/NotFound/NotFound";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import { alert } from "../../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { useReview } from "../../../context/ReviewProvider";
import Swal from "sweetalert2";
import { deleteReview } from "../../../models/review";

export default function UpdateReview() {
  const { refetchReview } = useReview();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Review • SitSpace"
    const load = async () => {
      const res = await getUserReview();
      if (res.status === 200) {
        setReview(res.payload);
        setRating(res.payload.rating);
        setIsLoading(false);
      }
      if (res.status === 404) return setIsLoading(null);
    };
    load();
  }, []);

  const handleStarClick = (i) => {
    setRating(i + 1);
  };

  const sendData = async () => {
    const res = await updateReview(review._id, {
      text: review.text,
      rating: rating,
    });
    if (res.status === 200) {
      alert("success", "Your review has been updated.");
      await refetchReview();
      navigate(`/review/${res.payload._id}`);
    }
    if (res.status === 400) {
      alert("error", `${res.message}`);
    }
  };

  const deleteConfirm = async () => {
    const Alert = Swal.mixin({
      buttonsStyling: true,
    });
    Alert.fire({
      title: "Do you want to delete your review?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete review",
      color: "black",
      confirmButtonColor: "#D7B5A2",
      cancelButtonText: "No, don't delete",
      cancelButtonColor: "#1E1E1E",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteReview(review._id);
        if (res.status === 200) {
          alert("success", "Review has been deleted.");
          await refetchReview();
        }
        if (res.status === 400 || res.status === 500) {
          alert("error", `${res.message}`);
        }
      }
    });
  };

  const handleInput = (e) => {
    setReview((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButton = (e) => {
    e.preventDefault();
    sendData();
  };

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

  return (
    <SitManagerView headerText="Change your review" pageNow={"review"}>
      <div className="sp-body">
        <div className="create-review-box">
          <div className="review-box-header">
            <h3>Review</h3>
          </div>
          <textarea
            className="review-box-area"
            placeholder="Write your review here..."
            defaultValue={review.text}
            name="text"
            onChange={handleInput}
          ></textarea>
        </div>
        <div className="review-footer">
          <div className="review-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < rating ? starFull : starEmpty}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            <p style={{ textAlign: "center" }}>
              Your rating: {rating.toFixed(1)}
            </p>
          </div>
          <div className="buttons">
            <button onClick={handleButton}>Update review</button>
            <button onClick={deleteConfirm} className="del-button">
              Delete review
            </button>
          </div>
        </div>
      </div>
    </SitManagerView>
  );
}
