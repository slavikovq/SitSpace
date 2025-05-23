import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Reviews from "./Reviews/Reviews";
import ViewReview from "./ViewReview/ViewReview";
import SeatingPreview from "./SeatingPreview/SeatingPreview";

import { useAuth } from "../context/AuthProvider";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={user ? <Navigate to={"/sitManager/seatingPreview"} replace={false}/> : <SignUp/>} />
          <Route path="/SignIn" element={user ? <Navigate to={"/sitManager/seatingPreview"} replace={false}/> : <SignIn/>} />
          <Route path="/Reviews" element={<Reviews/>} />
          <Route path="/Review" element={<ViewReview/>} />
          <Route path="/sitManager/seatingPreview" element={<SeatingPreview/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}