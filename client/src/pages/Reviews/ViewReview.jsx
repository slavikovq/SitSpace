import Navbar from "../../components/Navbar/Navbar";
import "../../scss/ViewReview.scss";
import Katherine from "../../assets/icons/Katherine.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteReview, getReviewById } from "../../models/review";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import NotFound from "../../components/NotFound/NotFound";
import { getUserById } from "../../models/user";
import starEmpty from "../../assets/icons/starEmpty.svg";
import starFull from "../../assets/icons/starFull.svg";
import { useAuth } from "../../context/AuthProvider";
import { HashLink } from "react-router-hash-link";
import Swal from "sweetalert2";
import { alert } from "../../utils/sweetAlert";
import { useReview } from "../../context/ReviewProvider";

export default function ViewReview() {
  const { user } = useAuth();
  const { refetchReview } = useReview();
  const [review, setReview] = useState();
  const [reviewAuthor, setReviewAuthor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useState(() => {
    const load = async () => {
      const res = await getReviewById(id);
      if (res.status === 200) {
        setReview(res.payload);
        const resAuthor = await getUserById(res.payload.author_id);
        if (resAuthor.status === 200) {
          setIsLoading(false);
          setReviewAuthor(resAuthor.payload);
        }
        if (resAuthor.status === 404 || resAuthor.status === 500)
          setIsLoading(null);
      }
      if (res.status === 404 || res.status === 500) setIsLoading(null);
    };
    load();
  }, []);

  const editNavigate = async () => {
    await refetchReview();
    navigate("/sitManager/manageReview");
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
        const res = await deleteReview(id);
        if (res.status === 200) {
          alert("success", "Review has been deleted.");
          await refetchReview();
          navigate("/sitManager/manageReview");
        }
        if (res.status === 400 || res.status === 500) {
          alert("error", `${res.message}`);
        }
      }
    });
  };

  if (isLoading) return <LoadingPage />;

  if (isLoading === null) return <NotFound />;

  return (
    <div className="view-review">
      <Navbar />
      <div className="view-review-box">
        <div className="view-review-card">
          <div className="desc-box">
            <div className="person-description">
              <img src={Katherine} alt="" id="pfp" />
              <div className="name-rating">
                <h1>
                  {reviewAuthor.first_name} {reviewAuthor.last_name}
                </h1>
                <div className="rating">
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      src={index < review.rating ? starFull : starEmpty}
                      onClick={() => handleStarClick(index)}
                    />
                  ))}
                  <p>{`${review.rating}.0`}</p>
                </div>
              </div>
            </div>
            <div className="review-text">
              <p>{review.text}</p>
            </div>
          </div>
          <div className="manage-review">
            <div className="review-bar">
              {user?._id === reviewAuthor._id && (
                <>
                  <Link className="e-button" onClick={editNavigate}>
                    Edit review
                  </Link>
                  <Link className="d-button" onClick={deleteConfirm}>
                    Delete review
                  </Link>
                  <p>|</p>
                </>
              )}
              <div className="b-button">
                <HashLink to="/#WhatPeopleAreSaying">Back to reviews</HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
