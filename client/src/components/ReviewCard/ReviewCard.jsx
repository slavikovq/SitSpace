import "../../scss/ReviewCard.scss";
import userPfp from "../../assets/img/user.png"
import { Link } from "react-router-dom";
import starFull from "../../assets/icons/starFull.svg"
import starEmpty from "../../assets/icons/starEmpty.svg"
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../models/user";
import LoadingPage from "../LoadingPage/LoadingPage";
import NotFound from "../NotFound/NotFound";

export default function ReviewCard({ review }) {
  const [reviewAuthor, setReviewAuthor] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const shortenedText = review.text.length > 240 ? review.text.slice(0, 240) + "..." : review.text;

  useEffect(() => {
    const load = async () => {
      const res = await getUserById(review.author_id);
      if(res.status === 200){
        setReviewAuthor(res.payload)
        setIsLoading(false)
      }
      if(res.status === 404 || res.status === 500) return setIsLoading(null)
    }
    load();
  }, [])

  if(isLoading) return <LoadingPage />

  if(isLoading === null) return <NotFound />

  return (
    <>
      <Link to={`/review/${review._id}`} style={{ textDecoration: "none" }}>
        <div className="review-card">
          <img src={reviewAuthor.profilePicture ? reviewAuthor.profilePicture : userPfp} alt={userPfp} />
          <p className="reviewer">{reviewAuthor.first_name} {reviewAuthor.last_name}</p>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < review.rating ? starFull : starEmpty}
                onClick={() => handleStarClick(index)}
              />
            ))}
            <p style={{ color: "black" }}>{`${review.rating}.0`}</p>
          </div>
          <p className="review">{shortenedText}</p>
        </div>
      </Link>
    </>
  );
}
