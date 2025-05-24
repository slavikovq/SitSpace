import { createContext, useContext, useEffect, useState } from "react";
import { getUserReview } from "../models/review";
import { useAuth } from "./AuthProvider";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { user } = useAuth();
  const [hasUserReview, setHasUserReview] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const refetchReview = async () => {
    setIsChecking(true);
    try {
      if (user) {
        const res = await getUserReview();
        setHasUserReview(!!res.payload);
      } else {
        setHasUserReview(false);
      }
    } catch (err) {
      console.error("Error fetching user review:", err);
      setHasUserReview(false);
    }
    setIsChecking(false);
  };

  useEffect(() => {
    refetchReview();
  }, [user]);

  return (
    <ReviewContext.Provider value={{ hasUserReview, isChecking, refetchReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
